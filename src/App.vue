<template>
  <div class="navigation">
    <v-btn :color="mode=== 'iFrameAdmin' ? 'secondary' : 'inherit'" elevation="2" variant="text"
           @click="mode = 'iFrameAdmin'">iFrame Admin console
    </v-btn>
    <v-btn :color="mode=== 'iFrameDashboard' ? 'secondary' : 'inherit'" elevation="2" variant="text"
           @click="mode = 'iFrameDashboard'">iFrame dashboards
    </v-btn>
    <v-btn :color="mode=== 'divDashboards' ? 'secondary' : 'inherit'" elevation="2" variant="text"
           @click="mode = 'divDashboards'">DIV dashboards
    </v-btn>
    <v-btn :color="mode=== 'div2wayComm' ? 'secondary' : 'inherit'" elevation="2" variant="text"
           @click="mode = 'div2wayComm'">DIV 2-way communication
    </v-btn>
  </div>
  <div class="content">
    <ic3-i-frame-admin v-if="mode === 'iFrameAdmin'"/>
    <ic3-i-frame v-if="mode === 'iFrameDashboard'"/>
    <ic3-div-multiple-reports v-if="mode === 'divDashboards'"/>
    <ic3-div2way-communication v-if="mode === 'div2wayComm'"/>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import Ic3IFrame from './components/ic3IFrame.vue';
import Ic3IFrameAdmin from './components/ic3IFrameAdmin.vue';
import Ic3DivMultipleReports from './components/ic3DivMultipleReports.vue';
import Ic3Div2wayCommunication from "@/components/ic3Div2wayCommunication.vue";

const mode = ref<string | null>("iFrameDashboard");

</script>

<style lang="scss" scoped>
@import './styles.scss';

.navigation {
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  padding: 8px;
  background: #424242;
  color: #90caf9;
}

.content {
  text-align: center;
}
</style>
