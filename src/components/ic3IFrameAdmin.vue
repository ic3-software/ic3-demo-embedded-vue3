<template>
  <div id="iccube-container">
    <!-- ---------------------------------------------------------------------------------------------------------------
    In a production environment the user would be authenticated by the host application and
    icCube would be configured to retrieve those credentials.

    For the sake of simplicity, the icCube server used by this demo is being configured to accept
    the ?ic3demo URL parameter meaning the configured ic3demo user is going to be used.
    -->
    <iframe src="/icCube/console/?ic3demo="/>
  </div>
</template>

<style lang="scss">
@import '../styles.scss';

#iccube-container {
  min-height: 90vh;
  width: 100%;

  iframe {
    min-height: 90vh;
    width: 100%;
    border: none;
  }
}
</style>
