---
sidebar_position: 4
title: Anexos
slug: /anexos
---

## pro_frm_epa_sv_procesarVentasSAP

```sql
-- =============================================
-- Author:		Juan Carlos González
-- Create date: 09-mar-2016
-- Description:	procesar los datos de ventas traidos de SAP S924

-- Author:		Juan Carlos González
-- Modify date: 28-mar-2017
-- Description:	Cambiar el campo grupo de materiales por grupo de comisiones

-- Author:		Juan Carlos González
-- Create date: 30-nov-2017
-- Description:	procesar las ventas por cliente para mercaderistas

-- Author:		Juan Carlos González y Andrés Carvajal
-- Create date: 18-dic-2017
-- Description:	incluir el backorder por cliente. temporal mientras se automatiza.

-- Author:		Juan Carlos González y Andrés Carvajal
-- Create date: 27-dic-2017
-- Description:	Quitar las secciones de salario varable mercaderias pues quedó en [pro_frm_epa_sv_me_procesarVentasSAP]

-- Author:		Juan Carlos González
-- Create date: 15-jul-2019
-- Description:	Calcular los totales por zona familia para tener en cuenta los canales que aplican exclusivamente para algunas familias
-- =============================================

ALTER PROCEDURE [dbo].[pro_frm_epa_sv_procesarVentasSAP]
	@anio INT,
	@mes INT
AS
BEGIN
	SET NOCOUNT ON;
	--RETURN

    DECLARE @ventas INT
    SELECT @ventas = COUNT(*) FROM frm_epa_sv_S924

    IF @ventas > 0
      BEGIN
		UPDATE frm_epa_sv_S924
		SET NETWR = LTRIM(NETWR)

		UPDATE frm_epa_sv_S924
		SET NETWR = '-'+REPLACE(NETWR, '-', '')
		WHERE NETWR LIKE '%-%'

	    DELETE FROM frm_epa_sv_ventasRes WHERE anio = @anio AND mes = @mes
		--DELETE FROM frm_epa_sv_me_ventasClienteRes WHERE anio = @anio AND mes = @mes

	    INSERT INTO frm_epa_sv_ventasRes
	        (anio,mes,orgVen,gruMat,ofiVen,zonVen,ventas)
		SELECT LEFT(SPBUP, 4) anio, RIGHT(SPBUP, 2) mes
			, VKORG
			, PROVG--, KONDM
			, 0, VKGRP,
		    SUM(CONVERT(DECIMAL(18,2), NETWR))
	    FROM frm_epa_sv_S924
	    GROUP BY VKORG
			, PROVG--, KONDM
			, VKGRP, SPBUP

		--TRUNCATE TABLE frm_epa_sv_ventasFamiliaRes
		DELETE FROM frm_epa_sv_ventasFamiliaRes WHERE anio = @anio AND mes = @mes

		INSERT INTO frm_epa_sv_ventasFamiliaRes
		(anio,mes,famProd,zonVen,ventas)
		SELECT LEFT(v.SPBUP, 4) anio, RIGHT(v.SPBUP, 2) mes, fp.famProd, v.VKGRP, SUM(CONVERT(DECIMAL(18,2), v.NETWR)) total
				FROM frm_epa_sv_S924 v
					INNER JOIN frm_epa_sv_FamiliaGrupoMateriales pa ON v.PROVG = pa.gruMat
					INNER JOIN frm_epa_sv_familiaProductos fp ON fp.famProd = pa.famProd AND ISNULL(fp.estado, 1) = 1
						AND (ISNULL(fp.canales, '') = '' OR CHARINDEX(v.VTWEG, fp.canales)>0)
		GROUP BY SPBUP,fp.famProd, VKGRP

		TRUNCATE TABLE frm_epa_sv_S924
      END
END

```

## pro_frm_epa_sv_dev_procesarDevolucionSAP

```sql
-- =============================================
-- Author:		Juan Carlos González
-- Create date: 12-sep-2017
-- Description:	procesar las devoluciones traídas de SAP ZVEN

-- Author:		Juan Carlos González
-- Create date: 30-nov-2017
-- Description:	procesar las devoluciones por cliente para mercaderistas
-- =============================================

ALTER PROCEDURE [dbo].[pro_frm_epa_sv_dev_procesarDevolucionSAP]
	@anio INT,
	@mes INT
AS
BEGIN
	SET NOCOUNT ON;
	--RETURN

    DECLARE @devoluciones INT
    SELECT @devoluciones = COUNT(*) FROM frm_epa_sv_dev_ZVEN

    IF @devoluciones = 0 RETURN

	UPDATE frm_epa_sv_dev_ZVEN
	SET NETWR = LTRIM(NETWR)

	UPDATE frm_epa_sv_dev_ZVEN
	SET NETWR = '-'+REPLACE(NETWR, '-', '')
	WHERE NETWR LIKE '%-%'

	--TRUNCATE TABLE frm_epa_sv_dev_devolucionRes
	DELETE FROM frm_epa_sv_dev_devolucionRes WHERE dvrAnio = @anio AND dvrMes = @mes
	DELETE FROM frm_epa_sv_me_dev_devolucionClienteRes WHERE dvrAnio = @anio AND dvrMes = @mes

	INSERT INTO frm_epa_sv_dev_devolucionRes
		(dvrAnio,dvrMes,dvrCanal,dvrZona,dvrGrupoComision,dvrDevoluciones)
	SELECT @anio, @mes, z.canal, d.VKGRP, d.PROVG
		, SUM(CONVERT(DECIMAL(18,2), d.NETWR))
	FROM frm_epa_sv_dev_ZVEN d
		INNER JOIN frm_epa_sv_zona z ON d.VKGRP = z.zonVen
	WHERE z.canal IS NOT NULL
		AND d.VKAUS IN (SELECT dvcaCausa FROM frm_epa_sv_dev_causas WHERE dvcaIncluida = 1)
	GROUP BY z.canal, d.VKGRP, d.PROVG

	INSERT INTO frm_epa_sv_me_dev_devolucionClienteRes
		(dvrAnio,dvrMes,dvrCliente,dvrDevoluciones)
	SELECT @anio, @mes, KUNAG
		, SUM(CONVERT(DECIMAL(18,2), d.NETWR))
	FROM frm_epa_sv_dev_ZVEN d
	GROUP BY KUNAG

	TRUNCATE TABLE frm_epa_sv_dev_ZVEN
END
```

## pro_frm_epa_sv_recalcularCumplimientoComisionMacrozona

```sql
-- =============================================
-- Author:		Juan Carlos González
-- Create date: 20-mar-2016
-- Description:	recalcular el cumplimiento y la comisión para los períodos que todavía no se han asignado por macrozona

-- Author:		Juan Carlos González
-- Create date: 15-sep-2017
-- Description:	Incluir penalización por devolución

-- Author:		Juan Carlos González y Carlos Cano
-- Create date: 12-jun-2019
-- Description:	Sólo calcular las macrozonas activas
-- =============================================

ALTER PROCEDURE [dbo].[pro_frm_epa_sv_recalcularCumplimientoComisionMacrozona]
AS
BEGIN
	DECLARE @anioDesde INT = 2019
	--SET NOCOUNT ON;
    DECLARE @anio INT, @mes INT, @macrozonaId INT

	DECLARE curPeriodo CURSOR FOR
	SELECT DISTINCT v.anio, v.mes, mz.macrozonaId
    FROM frm_epa_sv_ventasRes v
		INNER JOIN frm_epa_sv_macrozona_zona mz ON v.zonVen = mz.zonVen
		INNER JOIN frm_epa_sv_macrozona m ON mz.macrozonaId = m.id AND m.estado = 1
	WHERE v.anio >= @anioDesde
	EXCEPT
	SELECT DISTINCT c.anio, c.mes, ISNULL(mz.macrozonaId, c.macrozonaId) macrozonaId
    FROM frm_epa_sv_comision c
	    LEFT JOIN frm_epa_sv_macrozona_zona mz ON c.zonVen = mz.zonVen
    WHERE c.nomina IS NOT NULL
		AND c.anio >= @anioDesde

	OPEN curPeriodo

	FETCH NEXT FROM curPeriodo INTO @anio, @mes, @macrozonaId
	WHILE @@FETCH_STATUS = 0
	  BEGIN
		PRINT CONVERT(NVARCHAR(4), @anio) +'-'+ CONVERT(NVARCHAR(2), @mes) +'-'+ CONVERT(NVARCHAR(5), @macrozonaId)
			+ ' General'

		EXEC pro_frm_epa_sv_calcularCumplimientoZonas @anio, @mes, @macrozonaId
		EXEC pro_frm_epa_sv_dv_calcularDevolucionZonas @anio, @mes, @macrozonaId
		EXEC pro_frm_epa_sv_calcularComisionZonas @anio, @mes, @macrozonaId

		EXEC pro_frm_epa_sv_calcularCumplimientoMacrozona @anio, @mes, @macrozonaId
		EXEC pro_frm_epa_sv_dv_calcularDevolucionMacrozona @anio, @mes, @macrozonaId
		EXEC pro_frm_epa_sv_calcularComisionMacrozona @anio, @mes, @macrozonaId

		FETCH NEXT FROM curPeriodo INTO @anio, @mes, @macrozonaId
	  END
	CLOSE curPeriodo;
	DEALLOCATE curPeriodo;
END
```

### pro_frm_epa_sv_calcularCumplimientoZonas

```sql
-- =============================================
-- Author:		Juan Carlos González
-- Create date: 09-mar-2016
-- Description:	Calcular el cumplimiento a partir de las ventas y el presupuesto para una macrozona

-- Author:		Juan Carlos González
-- Create date: 12-sep-2017
-- Description:	Se separa el cumplimiento de zonas de macrozonas

-- Author:		Juan Carlos González
-- Create date: 15-sep-2017
-- Description:	Ajustar para devoluciones

-- Author:		Juan Carlos González
-- Create date: 15-jul-2019
-- Description:	Tomar los totales por zona familia para tener en cuenta los canales que aplican exclusivamente para algunas familias
-- =============================================

ALTER PROCEDURE [dbo].[pro_frm_epa_sv_calcularCumplimientoZonas]
	@anio INT,
	@mes INT,
	@macrozona INT
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @comisionesMes INT

	SELECT @comisionesMes = COUNT(*)
    FROM frm_epa_sv_comision c
    WHERE anio = @anio AND mes = @mes
		AND c.macrozonaId = @macrozona AND c.zonVen IS NOT NULL
		AND (c.usu_id IS NOT NULL OR c.nomina IS NOT NULL)

	IF @comisionesMes > 0 RETURN

	PRINT CONVERT(NVARCHAR(4), @anio) +'-'+ CONVERT(NVARCHAR(2), @mes) +'-'+ CONVERT(NVARCHAR(5), @macrozona)
		+ ' cumplimiento zona'

	DELETE c FROM frm_epa_sv_comision c
    WHERE anio = @anio AND mes = @mes
		AND c.macrozonaId= @macrozona AND c.zonVen IS NOT NULL

	INSERT INTO frm_epa_sv_comision
		(anio,mes,ofiVen,macrozonaId,zonVen,famProd
		,ventas,presupuesto
		,cumplimiento, cumplimientoSinPenal
		,tabcomId,perfilId,comision,usu_id)
	SELECT vt.anio, vt.mes, vt.ofiVen, vt.macrozonaId, vt.zonVen, vt.famProd
			, ROUND(vt.ventas, 0) ventas
			, ROUND(ISNULL(p.ventas, 0),0) presupuesto
			, CONVERT(DECIMAL(10, 2), ROUND(vt.ventas / ISNULL(p.ventas, 1) * 100.0, 2)) cumplimiento
			, CONVERT(DECIMAL(10, 2), ROUND(vt.ventas / ISNULL(p.ventas, 1) * 100.0, 2)) cumplimiento
			, zp.tabcomId, zp.perfilId, NULL, NULL
	FROM
		(
			SELECT v.anio, v.mes, 0 ofiVen, mz.macrozonaId, v.zonVen, v.famProd, SUM(v.ventas) ventas
			FROM frm_epa_sv_ventasFamiliaRes v
				INNER JOIN frm_epa_sv_macrozona_zona mz ON v.zonVen = mz.zonVen
			WHERE v.anio = @anio AND v.mes = @mes AND mz.macrozonaId = @macrozona
			GROUP BY v.anio, v.mes, mz.macrozonaId, v.zonVen, v.famProd
		) vt
		INNER JOIN frm_epa_sv_presupuesto p ON vt.anio = p.anio AND vt.mes = p.mes
						AND vt.zonVen = p.zonVen
						AND vt.famProd = p.famProd
		INNER JOIN frm_epa_sv_zonaParam zp ON zp.zonVen = vt.zonVen
END
```

### pro_frm_epa_sv_dv_calcularDevolucionZonas

```sql
-- =============================================
-- Author:		Juan Carlos González
-- Create date: 15-sep-2017
-- Description:	Calcular penalización por devolución

-- Author:		Juan Carlos González
-- Create date: 20-oct-2017
-- Description:	No afectar el cumplimiento de la zona-familia pues se tendrá en cuenta en la comisión final

-- Author:		Andrés Carvajal Arango
-- Create date: 29-Nov-2018
-- Description:	Solo tener en cuenta los grupos de comisión activos para devolución
-- =============================================

ALTER PROCEDURE [dbo].[pro_frm_epa_sv_dv_calcularDevolucionZonas]
	@anio INT,
	@mes INT,
	@macrozona INT
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @comisionesMes INT

	SELECT @comisionesMes = COUNT(*)
    FROM frm_epa_sv_comision c
    WHERE anio = @anio AND mes = @mes
		AND c.macrozonaId = @macrozona AND c.zonVen IS NOT NULL
		AND (c.usu_id IS NOT NULL OR c.nomina IS NOT NULL)

	IF @comisionesMes > 0 RETURN

	PRINT CONVERT(NVARCHAR(4), @anio) +'-'+ CONVERT(NVARCHAR(2), @mes) +'-'+ CONVERT(NVARCHAR(5), @macrozona)
		+ ' devolución zona'

	DECLARE @perfilVendedor INT = 1 --Sólo aplica para vendedores ID en tabla frm_epa_sv_perfiles

	UPDATE c
	SET c.devolucion = NULL, c.devolucionPorc =  NULL, devolucionPenal = NULL, cumplimiento = cumplimientoSinPenal
		, c.canal = z.canal
	FROM frm_epa_sv_comision c
		INNER JOIN frm_epa_sv_zona z ON c.zonVen = z.zonVen
	WHERE anio = @anio AND mes = @mes
		AND c.macrozonaId= @macrozona AND c.zonVen IS NOT NULL
		AND  c.perfilId = @perfilVendedor

	UPDATE c SET c.devolucion = dev.devoluciones
		, c.devolucionPorc = CONVERT(DECIMAL(10,2), 100.0 * dev.devoluciones / c.ventas)
	FROM frm_epa_sv_comision c
		INNER JOIN
			(SELECT --d.dvrAnio, d.dvrMes, d.dvrCanal
				d.dvrZona, pa.famProd, SUM(d.dvrDevoluciones) devoluciones
			FROM frm_epa_sv_dev_devolucionRes d
				INNER JOIN frm_epa_sv_FamiliaGrupoMateriales pa ON d.dvrGrupoComision = pa.gruMat AND ISNULL(pa.gruDevolucionActivo, 1) = 1
				INNER JOIN frm_epa_sv_familiaProductos fp ON fp.famProd = pa.famProd AND ISNULL(fp.estado, 1) = 1 AND ISNULL(fp.devolucion, 0) = 1
			WHERE d.dvrAnio = @anio AND d.dvrMes = @mes AND d.dvrDevoluciones > 0
			GROUP BY --d.dvrAnio, d.dvrMes, d.dvrCanal
				d.dvrZona, pa.famProd
			) dev ON dev.dvrZona = c.zonVen AND dev.famProd = c.famProd
	WHERE c.macrozonaId = @macrozona
		AND c.anio = @anio AND c.mes = @mes
		AND c.zonVen IS NOT NULL
		AND  c.perfilId = @perfilVendedor

	UPDATE c
	SET c.devolucionPenal = dp.tdvpPenalidad
		--, c.cumplimiento = c.cumplimientoSinPenal - dp.tdvpPenalidad
	FROM frm_epa_sv_comision c
		INNER JOIN frm_epa_sv_dev_devolucionTabla dt ON c.canal = dt.tdvCanal
		INNER JOIN frm_epa_sv_dev_devolucionParam dp ON dp.tdvId = dt.tdvId
							--AND c.famProd = dp.famProd --Sólo se definió para la familia total
							AND c.devolucionPorc >= dp.tdvpMin
							AND c.devolucionPorc <= dp.tdvpMax
	WHERE c.anio = @anio AND c.mes = @mes
		AND c.macrozonaId = @macrozona
		AND c.zonVen IS NOT NULL AND c.devolucion > 0 --IS NOT NULL
END
```

### pro_frm_epa_sv_calcularComisionZonas

```sql
-- =============================================
-- Author:		Juan Carlos González
-- Create date: 09-mar-2016
-- Description:	Calcular la comisión por zona y general para una macrozona

-- Author:		Juan Carlos González
-- Create date: 12-sep-2017
-- Description:	Se separa la comisión de zonas de macrozonas

-- Author:		Juan Carlos González, Andrés Carvajal, Cristian Cantillo
-- Create date: 30-abr-2020
-- Description:	Calculo de comisión por venta minima
-- =============================================

ALTER PROCEDURE [dbo].[pro_frm_epa_sv_calcularComisionZonas]
	@anio INT,
	@mes INT,
	@macrozona INT
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @comisionesMes INT

	SELECT @comisionesMes = COUNT(*)
    FROM frm_epa_sv_comision c
    WHERE anio = @anio AND mes = @mes
		AND c.macrozonaId= @macrozona AND c.zonVen IS NOT NULL
		AND (c.usu_id IS NOT NULL OR c.nomina IS NOT NULL)

	IF @comisionesMes > 0 RETURN

	PRINT CONVERT(NVARCHAR(4), @anio) +'-'+ CONVERT(NVARCHAR(2), @mes) +'-'+ CONVERT(NVARCHAR(5), @macrozona)
		+ ' comisión zona'

	UPDATE c
	SET c.comision = NULL
	FROM frm_epa_sv_comision c
	WHERE anio = @anio AND mes = @mes
		AND c.macrozonaId= @macrozona AND c.zonVen IS NOT NULL

	UPDATE c
	SET c.comision = cp.comision
	FROM frm_epa_sv_comision c
		INNER JOIN frm_epa_sv_macrozona_zona mz ON c.zonVen = mz.zonVen AND c.macrozonaId = mz.macrozonaId
		LEFT JOIN frm_epa_sv_comisionParam cp ON cp.tabcomId = c.tabcomId
						AND c.famProd = cp.famProd
						AND c.cumplimiento >= cp.cumpMin
						AND c.cumplimiento <= cp.cumpMax
	 WHERE c.anio = @anio AND c.mes = @mes AND mz.macrozonaId = @macrozona
		AND c.zonVen IS NOT NULL AND c.nomina IS NULL

	SELECT c.comision
	FROM frm_epa_sv_comision c
	INNER JOIN frm_epa_sv_macrozona_zona mz ON c.zonVen = mz.zonVen AND c.macrozonaId = mz.macrozonaId
	LEFT JOIN frm_epa_sv_comisionParam cp ON cp.tabcomId = c.tabcomId
					AND c.famProd = cp.famProd
					AND c.cumplimiento >= cp.cumpMin
					AND c.cumplimiento <= cp.cumpMax
	WHERE c.anio = @anio AND c.mes = @mes AND mz.macrozonaId = @macrozona
		AND c.zonVen IS NOT NULL AND c.nomina IS NULL

	--Totalizar la comisión y aplicar la devolución general
	INSERT INTO frm_epa_sv_comision
		(anio,mes,ofiVen,macrozonaId,zonVen,famProd
		, tabcomId,perfilId,usu_id, canal
		, ventas,presupuesto
		, cumplimiento, cumplimientoSinPenal
		, devolucion, devolucionPorc, devolucionPenal
		, comisionSinPenal, comision
		)
	SELECT c.anio, c.mes, c.ofiVen, c.macrozonaId, c.zonVen, NULL
		, c.tabcomId, c.perfilId, NULL, c.canal
		, SUM(c.ventas) ventas, SUM(c.presupuesto) presupuesto
		, CONVERT(DECIMAL(10, 2), ROUND(SUM(c.ventas) / SUM(c.presupuesto) * 100.0, 2)) - MAX(ISNULL(c.devolucionPenal, 0)) cumplimiento
		, CONVERT(DECIMAL(10, 2), ROUND(SUM(c.ventas) / SUM(c.presupuesto) * 100.0, 2)) cumplimientoSinPenal
		, SUM(c.devolucion) devolucion
		, MAX(c.devolucionPorc) devolucionPorc, MAX(c.devolucionPenal) devolucionPenal
		, SUM(c.comision) comisionSinPenal
		, SUM(c.comision) * (100 - MAX(ISNULL(c.devolucionPenal, 0))) / 100 comision
	FROM frm_epa_sv_comision c
	WHERE c.anio = @anio AND c.mes = @mes AND c.macrozonaId = @macrozona AND c.zonVen IS NOT NULL
	GROUP BY c.anio, c.mes, c.ofiVen, c.macrozonaId, c.zonVen, c.tabcomId, c.perfilId, c.canal

	--Calculo de comisión por venta minima
	UPDATE c
	SET c.comision = cp.comision
		, c.comisionVentaMinima = cp.comision
	FROM frm_epa_sv_comision c
		INNER JOIN frm_epa_sv_macrozona_zona mz ON c.zonVen = mz.zonVen AND c.macrozonaId = mz.macrozonaId
		INNER JOIN frm_epa_sv_comisionTabla ct ON ct.id = c.tabcomId AND c.ventas >= ct.ventaMinima
		INNER JOIN frm_epa_sv_comisionParam cp ON cp.tabcomId = c.tabcomId
						AND cp.cumpMin = -1
						AND cp.cumpMax = -1
						AND cp.famProd = 7 --Familia Total
	WHERE c.anio = @anio AND c.mes = @mes
		AND mz.macrozonaId = @macrozona
		AND c.zonVen IS NOT NULL
		AND c.nomina IS NULL
		AND c.famProd IS NULL
		AND c.comision = 0
END
```

### pro_frm_epa_sv_calcularCumplimientoMacrozona

```sql
-- =============================================
-- Author:		Juan Carlos González
-- Create date: 09-mar-2016
-- Description:	Calcular el cumplimiento a partir de las ventas y el presupuesto para una macrozona

-- Author:		Juan Carlos González
-- Create date: 12-sep-2017
-- Description:	Se separa el cumplimiento de zonas de macrozonas

-- Author:		Juan Carlos González
-- Create date: 15-jul-2019
-- Description:	Tomar los totales por zona familia para tener en cuenta los canales que aplican exclusivamente para algunas familias
-- =============================================

ALTER PROCEDURE [dbo].[pro_frm_epa_sv_calcularCumplimientoMacrozona]
	@anio INT,
	@mes INT,
	@macrozona INT
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @comisionesMes INT

	SELECT @comisionesMes = COUNT(*)
    FROM frm_epa_sv_comision c
    WHERE anio = @anio AND mes = @mes
		AND c.macrozonaId= @macrozona AND c.zonVen IS NULL
		--AND (c.usu_id IS NOT NULL OR c.nomina IS NOT NULL)
		AND (c.nomina IS NOT NULL)

	IF @comisionesMes > 0 RETURN

	PRINT CONVERT(NVARCHAR(4), @anio) +'-'+ CONVERT(NVARCHAR(2), @mes) +'-'+ CONVERT(NVARCHAR(5), @macrozona)
		+ ' cumplimiento macrozona'

	DELETE c FROM frm_epa_sv_comision c
    WHERE anio = @anio AND mes = @mes
		AND c.macrozonaId= @macrozona AND c.zonVen IS NULL

	INSERT INTO frm_epa_sv_comision
		(anio,mes,ofiVen,macrozonaId,zonVen
		,famProd,ventas,presupuesto,cumplimiento, cumplimientoSinPenal
		,tabcomId,perfilId,comision,usu_id)
	SELECT vt.anio, vt.mes, NULL, mz.id, NULL, vt.famProd
			, SUM(vt.ventas) ventas
			, SUM(ISNULL(p.ventas, 0) ) presupuesto
			, CONVERT(DECIMAL(10, 2), ROUND(SUM(vt.ventas) / SUM(ISNULL(p.ventas, 1)) * 100.0, 2)) cumplimiento
			, CONVERT(DECIMAL(10, 2), ROUND(SUM(vt.ventas) / SUM(ISNULL(p.ventas, 1)) * 100.0, 2)) cumplimientoSinPenal
			, mz.tabcomId, mz.perfilId, NULL, mz.usuId
	FROM
		(
			SELECT v.anio, v.mes, mz.macrozonaId, 0 ofiVen, v.zonVen, v.famProd, SUM(v.ventas) ventas
			FROM frm_epa_sv_ventasFamiliaRes v
				INNER JOIN frm_epa_sv_macrozona_zona mz ON v.zonVen = mz.zonVen
			WHERE v.anio = @anio AND v.mes = @mes AND mz.macrozonaId = @macrozona
			GROUP BY v.anio, v.mes, mz.macrozonaId, v.zonVen, v.famProd

		) vt
		INNER JOIN frm_epa_sv_presupuesto p ON vt.anio = p.anio AND vt.mes = p.mes
						AND vt.zonVen = p.zonVen
						AND vt.famProd = p.famProd
		INNER JOIN frm_epa_sv_macrozona mz ON mz.id = vt.macrozonaId
	GROUP BY vt.anio, vt.mes, mz.id, vt.famProd, mz.tabcomId, mz.perfilId, mz.usuId
END
```

### pro_frm_epa_sv_dv_calcularDevolucionMacrozona

```sql
-- =============================================
-- Author:		Juan Carlos González
-- Create date: 09-oct-2017
-- Description:	Calcular penalización por devolución en Macrozona

-- Author:		Juan Carlos González
-- Create date: 20-oct-2017
-- Description:	No afectar el cumplimiento de la macrozona-familia pues se tendrá en cuenta en la comisión final

-- Author:		Andrés Carvajal Arango
-- Create date: 29-Nov-2018
-- Description:	Solo tener en cuenta los grupos de comisión activos para devolución
-- =============================================

ALTER PROCEDURE [dbo].[pro_frm_epa_sv_dv_calcularDevolucionMacrozona]
	@anio INT,
	@mes INT,
	@macrozona INT
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @comisionesMes INT

	SELECT @comisionesMes = COUNT(*)
    FROM frm_epa_sv_comision c
    WHERE anio = @anio AND mes = @mes
		AND c.macrozonaId = @macrozona AND c.zonVen IS NULL
		AND (c.nomina IS NOT NULL)

	IF @comisionesMes > 0 RETURN

		PRINT CONVERT(NVARCHAR(4), @anio) +'-'+ CONVERT(NVARCHAR(2), @mes) +'-'+ CONVERT(NVARCHAR(5), @macrozona)
		+ ' devolución macrozona'

	--DECLARE @perfilVendedor INT = 1 --Sólo aplica para vendedores ID en tabla frm_epa_sv_perfiles

	UPDATE c
	SET c.devolucion = NULL, c.devolucionPorc =  NULL, devolucionPenal = NULL, cumplimiento = cumplimientoSinPenal
		, c.canal = mz.canal
	FROM frm_epa_sv_comision c
		INNER JOIN frm_epa_sv_macrozona mz ON c.macrozonaId = mz.id
	WHERE anio = @anio AND mes = @mes
		AND c.macrozonaId= @macrozona AND c.zonVen IS NULL
		--AND  c.perfilId = @perfilVendedor

	UPDATE c SET c.devolucion = dev.devoluciones
		, c.devolucionPorc = CONVERT(DECIMAL(10,2), 100.0 * dev.devoluciones / c.ventas)
	FROM frm_epa_sv_comision c
		INNER JOIN
			(SELECT --d.dvrAnio, d.dvrMes, d.dvrCanal
				pa.famProd, SUM(d.dvrDevoluciones) devoluciones
			FROM frm_epa_sv_dev_devolucionRes d
				INNER JOIN frm_epa_sv_FamiliaGrupoMateriales pa ON d.dvrGrupoComision = pa.gruMat AND ISNULL(pa.gruDevolucionActivo, 1) = 1
				INNER JOIN frm_epa_sv_familiaProductos fp ON fp.famProd = pa.famProd AND ISNULL(fp.estado, 1) = 1 AND ISNULL(fp.devolucion, 0) = 1
				INNER JOIN frm_epa_sv_macrozona_zona mz ON d.dvrZona = mz.zonVen
			WHERE d.dvrAnio = @anio AND d.dvrMes = @mes AND mz.macrozonaId = @macrozona AND d.dvrDevoluciones > 0
			GROUP BY --d.dvrAnio, d.dvrMes, d.dvrCanal
				pa.famProd
			) dev ON dev.famProd = c.famProd
	WHERE c.macrozonaId = @macrozona
		AND c.anio = @anio AND c.mes = @mes
		AND c.zonVen IS NULL
		--AND  c.perfilId = @perfilVendedor

	UPDATE c
	SET c.devolucionPenal = dp.tdvpPenalidad
		--, c.cumplimiento = c.cumplimientoSinPenal - dp.tdvpPenalidad
	FROM frm_epa_sv_comision c
		INNER JOIN frm_epa_sv_dev_devolucionTabla dt ON c.canal = dt.tdvCanal
		INNER JOIN frm_epa_sv_dev_devolucionParam dp ON dp.tdvId = dt.tdvId
							--AND c.famProd = dp.famProd --Sólo se definió para la familia total
							AND c.devolucionPorc >= dp.tdvpMin
							AND c.devolucionPorc <= dp.tdvpMax
	WHERE c.anio = @anio AND c.mes = @mes
		AND c.macrozonaId = @macrozona AND c.zonVen IS NULL
		AND c.devolucion > 0 --IS NOT NULL
END
```

### pro_frm_epa_sv_calcularComisionMacrozona

```sql
-- =============================================
-- Author:		Juan Carlos González
-- Create date: 09-mar-2016
-- Description:	Calcular la comisión por zona y general para una macrozona

-- Author:		Juan Carlos González
-- Create date: 12-sep-2017
-- Description:	Se separa la comisión de zonas de macrozonas
-- =============================================

ALTER PROCEDURE [dbo].[pro_frm_epa_sv_calcularComisionMacrozona]
	@anio INT,
	@mes INT,
	@macrozona INT
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @comisionesMes INT

	SELECT @comisionesMes = COUNT(*)
    FROM frm_epa_sv_comision c
    WHERE anio = @anio AND mes = @mes
		AND c.macrozonaId= @macrozona AND c.zonVen IS NULL
		AND (c.nomina IS NOT NULL)

	IF @comisionesMes > 0 RETURN

		PRINT CONVERT(NVARCHAR(4), @anio) +'-'+ CONVERT(NVARCHAR(2), @mes) +'-'+ CONVERT(NVARCHAR(5), @macrozona)
		+ ' comisión macrozona'

	UPDATE c
	SET c.comision = NULL
	FROM frm_epa_sv_comision c
	WHERE anio = @anio AND mes = @mes
		AND c.macrozonaId= @macrozona AND c.zonVen IS NULL

	UPDATE c
	SET c.comision = cp.comision
	FROM frm_epa_sv_comision c
		LEFT JOIN frm_epa_sv_comisionParam cp ON cp.tabcomId = c.tabcomId
						AND c.famProd = cp.famProd
						AND c.cumplimiento >= cp.cumpMin
						AND c.cumplimiento <= cp.cumpMax
	WHERE c.anio = @anio AND c.mes = @mes
		AND c.macrozonaId = @macrozona
		AND c.zonVen IS NULL AND c.nomina IS NULL

	--Totalizar la comisión y aplicar la devolución general
	INSERT INTO frm_epa_sv_comision
		(anio,mes,ofiVen,macrozonaId,zonVen,famProd
		, tabcomId,perfilId,usu_id, canal
		, ventas,presupuesto
		, cumplimiento, cumplimientoSinPenal
		, devolucion, devolucionPorc, devolucionPenal
		, comisionSinPenal, comision
		)
	SELECT c.anio, c.mes, c.ofiVen, c.macrozonaId, NULL, NULL
		, c.tabcomId, c.perfilId, c.usu_id, c.canal
		, SUM(c.ventas) ventas, SUM(c.presupuesto) presupuesto
		, CONVERT(DECIMAL(10, 2), ROUND(SUM(c.ventas) / SUM(c.presupuesto) * 100.0, 2)) - MAX(ISNULL(c.devolucionPenal, 0)) cumplimiento
		, CONVERT(DECIMAL(10, 2), ROUND(SUM(c.ventas) / SUM(c.presupuesto) * 100.0, 2)) cumplimientoSinPenal
		, SUM(c.devolucion) devolucion
		, MAX(c.devolucionPorc) devolucionPorc, MAX(c.devolucionPenal) devolucionPenal
		, SUM(c.comision) comisionSinPenal
		, SUM(c.comision) * (100 - MAX(ISNULL(c.devolucionPenal, 0))) / 100 comision
	FROM frm_epa_sv_comision c
	WHERE c.anio = @anio AND c.mes = @mes AND c.macrozonaId = @macrozona AND c.zonVen IS NULL
	GROUP BY c.anio, c.mes, c.ofiVen, c.macrozonaId, c.tabcomId, c.perfilId,c.usu_id, c.canal
END

```

## Update

<div class="ultima-actualizacion">
  <small>
    <i>
      Ultima actualización:
      <b> 02 de agosto de 2022.</b>
    </i>
  </small>

  <small>
    <i>
      Actualizado por:
      <b> Juan C. González.</b>
    </i>
  </small>
</div>
