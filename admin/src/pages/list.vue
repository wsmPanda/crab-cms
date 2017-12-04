<template>
<div class="list" :key="code">
    <DataTabe :code="code"></DataTabe>
</div>  
</template>

<script>
import DataTabe from "@/components/listTable";
import base from "./node";

export default {
  extends: base,
  props: {},
  components: {
    DataTabe
  }
};
</script>

<style>

</style>
