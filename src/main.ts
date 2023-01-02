import {createApp} from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import {DashboardsLoaderDivContext} from '@ic3/reporting-api';

createApp(App).use(createVuetify()).mount('#app');

// In an actual production environment you would put the context in your own global or scoped variables.
// We want a single instance of this context: libraries (i.e., JS, CSS, plugins, etc...) are preloaded
// in the constructor. Remember that you can open several DIVs with the same context.

// -----------------------------------------------------------------------------------------------------------------
// In a production environment the user would be authenticated by the host application and
// icCube would be configured to retrieve those credentials.
//
// For the sake of simplicity, the icCube server used by this demo is being configured to accept
// the ?ic3demo URL parameter meaning the configured ic3demo user is going to be used.
// -----------------------------------------------------------------------------------------------------------------

const suffix = "?ic3demo";

export const ic3DivContext: DashboardsLoaderDivContext = new DashboardsLoaderDivContext({
    urlSuffix: suffix,
});

