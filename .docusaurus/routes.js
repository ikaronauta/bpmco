
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/bpmco/__docusaurus/debug',
    component: ComponentCreator('/bpmco/__docusaurus/debug','ebc'),
    exact: true
  },
  {
    path: '/bpmco/__docusaurus/debug/config',
    component: ComponentCreator('/bpmco/__docusaurus/debug/config','c77'),
    exact: true
  },
  {
    path: '/bpmco/__docusaurus/debug/content',
    component: ComponentCreator('/bpmco/__docusaurus/debug/content','f39'),
    exact: true
  },
  {
    path: '/bpmco/__docusaurus/debug/globalData',
    component: ComponentCreator('/bpmco/__docusaurus/debug/globalData','94e'),
    exact: true
  },
  {
    path: '/bpmco/__docusaurus/debug/metadata',
    component: ComponentCreator('/bpmco/__docusaurus/debug/metadata','f87'),
    exact: true
  },
  {
    path: '/bpmco/__docusaurus/debug/registry',
    component: ComponentCreator('/bpmco/__docusaurus/debug/registry','71c'),
    exact: true
  },
  {
    path: '/bpmco/__docusaurus/debug/routes',
    component: ComponentCreator('/bpmco/__docusaurus/debug/routes','071'),
    exact: true
  },
  {
    path: '/bpmco/markdown-page',
    component: ComponentCreator('/bpmco/markdown-page','5bf'),
    exact: true
  },
  {
    path: '/bpmco/docs',
    component: ComponentCreator('/bpmco/docs','528'),
    routes: [
      {
        path: '/bpmco/docs/',
        component: ComponentCreator('/bpmco/docs/','be7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/bpmco/docs/anexos',
        component: ComponentCreator('/bpmco/docs/anexos','8ec'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/bpmco/docs/datos-maestros-proceso',
        component: ComponentCreator('/bpmco/docs/datos-maestros-proceso','af7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/bpmco/docs/ejecucion-de-ruta',
        component: ComponentCreator('/bpmco/docs/ejecucion-de-ruta','049'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/bpmco/docs/explicacion-mas-detallada-sobre-el-proceso',
        component: ComponentCreator('/bpmco/docs/explicacion-mas-detallada-sobre-el-proceso','e8d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/bpmco/docs/flujos-del-proceso',
        component: ComponentCreator('/bpmco/docs/flujos-del-proceso','c1c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/bpmco/docs/formulario',
        component: ComponentCreator('/bpmco/docs/formulario','f94'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/bpmco/docs/informacion-general-bonlac-prueba',
        component: ComponentCreator('/bpmco/docs/informacion-general-bonlac-prueba','7be'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/bpmco/docs/informacion-general-bpmco',
        component: ComponentCreator('/bpmco/docs/informacion-general-bpmco','fa2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/bpmco/docs/informacion-general-datos-maestros',
        component: ComponentCreator('/bpmco/docs/informacion-general-datos-maestros','254'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/bpmco/docs/informacion-general-epa',
        component: ComponentCreator('/bpmco/docs/informacion-general-epa','8e4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/bpmco/docs/informacion-general-icasa',
        component: ComponentCreator('/bpmco/docs/informacion-general-icasa','baa'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/bpmco/docs/informacion-general-levapan',
        component: ComponentCreator('/bpmco/docs/informacion-general-levapan','2c6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/bpmco/docs/informacion-general-proceso-proveeduria-de-leche',
        component: ComponentCreator('/bpmco/docs/informacion-general-proceso-proveeduria-de-leche','ebb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/bpmco/docs/informacion-general-salario-variable-para-vendedores',
        component: ComponentCreator('/bpmco/docs/informacion-general-salario-variable-para-vendedores','e2d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/bpmco/docs/informacion-tecnica',
        component: ComponentCreator('/bpmco/docs/informacion-tecnica','40d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/bpmco/docs/plenacion-de-rutas',
        component: ComponentCreator('/bpmco/docs/plenacion-de-rutas','349'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/bpmco/docs/proceso-sap',
        component: ComponentCreator('/bpmco/docs/proceso-sap','468'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/bpmco/',
    component: ComponentCreator('/bpmco/','68d'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
