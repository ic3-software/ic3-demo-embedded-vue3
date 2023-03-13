<template>
  <div>
    <div class="dashboard-selector">
      <div>ic3: {{ ic3reporting?.getVersion().version }}</div>
      <div>iFrame report chooser</div>
    </div>
    <div id="main">
      <div id="left">
        <v-btn :color="d=== '1way' ? 'secondary' : 'inherit'" variant="text"
               @click="(d = '1way') && openDashboard('shared:/Embedded/1way');">1way
        </v-btn>
        <v-btn :color="d=== 'singleChart' ? 'secondary' : 'inherit'" variant="text"
               @click="(d = 'singleChart') && openDashboard('shared:/Embedded/singleChart');">singleChart
        </v-btn>
        <v-btn :color="d=== 'singleTable' ? 'secondary' : 'inherit'" variant="text"
               @click="(d = 'singleTable') && openDashboard('shared:/Embedded/singleTable');">singleTable
        </v-btn>
      </div>
      <div id="iccube-container"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import type {IReporting} from '@ic3/reporting-api-embedded';
import {DashboardsLoaderFrame} from '@ic3/reporting-api-embedded';

const d = ref<string | null>("1way");

const ic3reporting = ref<IReporting | null>(null);
const country = ref("");

const openDashboard = (path: string) => {
  if (ic3reporting.value != null) {
    ic3reporting.value.openReport({path});
  }
}

// -----------------------------------------------------------------------------------------------------------------
// In a production environment the user would be authenticated by the host application and
// icCube would be configured to retrieve those credentials.
//
// For the sake of simplicity, the icCube server used by this demo is being configured to accept
// the ?ic3demo URL parameter meaning the configured ic3demo user is going to be used.
// -----------------------------------------------------------------------------------------------------------------

const suffix = "&ic3demo="

onMounted(() => {
  DashboardsLoaderFrame({
    containerId: 'iccube-container',
    // Default dashboard path
    url: '/icCube/report/viewer?ic3report=shared%3A%2FEmbedded%2F' + d.value + suffix,
    onReady: reporting => {
      console.log("ic3ready : ", reporting);
      ic3reporting.value = reporting;

      reporting.onEvent("country", value => {
        if (Array.isArray(value)) {
          country.value = value.map(i => i.caption).join(", ");
        } else {
          country.value = value?.caption ?? "";
        }
      });
    },
    frameId: "frame1"
  });
});


</script>

<style lang="scss">
@import '../styles.scss';


#main {
  width: 100%;
  min-height: 90vh;
  display: flex;
  flex-direction: row;
}

#left {
  width: 260px;
  background: #424242;
  color: #90caf9;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
}

.selectionText {
  min-height: 100px;
}

#iccube-container {
  min-height: 90vh;
  width: 100%;

  iframe {
    min-height: 90vh;
  }
}
</style>
