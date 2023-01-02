<template>
  <div>
    <div class="dashboard-selector">
      <div>ic3: {{ ic3reporting?.getVersion().version }}</div>
      <div>DIV Report chooser</div>
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
      <div id="right">
        <div v-if="loading" class="loader">
          Select a report
        </div>
        <div v-if="errorMessage" class="alert">
          {{ errorMessage }}
        </div>
        <div id="dashboard-container"/>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {onMounted, ref,} from 'vue';
import type {IReportDefinition, IReporting} from '@ic3/reporting-api';
import {ic3DivContext} from "@/main";

const d = ref<string | null>();

const errorMessage = ref('');
const loading = ref(true);
const ic3reporting = ref<IReporting | null>(null);
const comboSelection = ref();

const openDashboard = (path: string) => {
  if (ic3reporting.value != null) {
    ic3reporting.value.openReport({
      path: path,

      onDefinition: (report: IReportDefinition) => {
        console.log('[ic3-demo] open-report:' + report.getPath() + ' - onDefinition', report);
        loading.value = false;
      },

      onError: (error: any) => {
        console.log('[ic3-demo] open-report: '+path+' - onError', error);
        errorMessage.value = error;
        loading.value = false;
        return true /* handled */;
      },

    });
  }
}

onMounted(() => {

  const context = ic3DivContext;

  const container = document.getElementById('dashboard-container');
  if (container == null) {
    errorMessage.value = "container not found";
    return;
  }

  // load icCube reporting in the 'container"
  context.loadLibsAndInitialize({uid: "container1", container: container}).then((reporting: IReporting) => {

    console.log("ic3ready : ", reporting);

    reporting.onEvent("continent", (value:any) => {
      console.log("ic4 value : ", value);
      if (Array.isArray(value)) {
        comboSelection.value = value.map(i => i.caption);
      } else {
        comboSelection.value = value?.caption ? [value.caption] : undefined;
      }
    });

    ic3reporting.value = reporting;

  }).catch((error: string) => {
    errorMessage.value = error;
    loading.value = false;
  });

});

</script>

<style lang="scss" scoped>
@import '../styles.scss';

#main {
  width: 100%;
  min-height: 90vh;
  display:flex;
  flex-direction: row;
}
#left {
  width: 260px;
  background: #424242;
  color: #90caf9;
  padding-top: 20px;
  display:flex;
  flex-direction: column;
}
.selectionText {
  min-height: 100px;
}
#right {
  width: 100%;
  height: 100%;
}
#dashboard-container {
  width: 100%;
  height: 100%;
}
</style>
