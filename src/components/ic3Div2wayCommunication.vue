<template>
  <div>
    <div class="dashboard-selector">
      <div>ic3: {{ ic3reporting?.getVersion().version }}</div>
      <div>An example of two way communication taken from React demo. Left combo is linked with the report's continent list</div>
    </div>

      <div id="main">
        <div id="left">
          <div class="selectionText">{{comboSelection ? comboSelection.join(",") : "No Selection"}}</div>
          <v-btn variant="text" @click="fireContinent('Asia')">Select Asia</v-btn>
          <v-btn variant="text" @click="fireContinent('Oceania')">Select Oceania</v-btn>
        </div>
        <div id="right">
          <div v-if="loading" class="loader">
            Loading...
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
import type {IReportDefinition, IReporting} from '@ic3/reporting-api-embedded';
import {ic3DivContext} from "@/main";

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

const fireContinent = (continent:string) => {

  const CONTINENT_NAMES = ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"];
  const CONTINENT_UNIQUE_NAMES = [
    "[Geography].[Geography].[Continent].&[AF]"
    , "[Geography].[Geography].[Continent].&[AS]"
    , "[Geography].[Geography].[Continent].&[EU]"
    , "[Geography].[Geography].[Continent].&[NA]"
    , "[Geography].[Geography].[Continent].&[OC]"
    , "[Geography].[Geography].[Continent].&[SA]"
  ];

  function continentUniqueName(continent: string) {
    return CONTINENT_UNIQUE_NAMES[CONTINENT_NAMES.indexOf(continent)];
  }

  // transforming to icCube events
  if (ic3reporting.value != null) {
    const value = {
      caption: continent, name: continent, uniqueName: continentUniqueName(continent)
    }
    // fire an event to icCube
    ic3reporting.value.fireEvent("continent", value);

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

    // listener on "continent" events
    reporting.onEvent("continent", (value:any) => {
      console.log("continent event generated : ", value);
      if (Array.isArray(value)) {
        comboSelection.value = value.map(i => i.caption);
      } else {
        comboSelection.value = value?.caption ? [value.caption] : undefined;
      }
    });

    // opens the report in the container
    ic3reporting.value = reporting;
    openDashboard('shared:/Embedded/2wayFilterSync');

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
