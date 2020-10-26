import '@babel/polyfill';

const coreTestContext = require.context('./src/', true, /\.test\.(js|ts)$/);
coreTestContext.keys().forEach(coreTestContext);
