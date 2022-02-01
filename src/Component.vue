<template>
  <div class="w-full">
    <label for="package">Please insert in <code class="text-rose-700">package</code> name</label>
    <input class="input" type="text" id="package" v-model="packageAndroid"/>
    <button class="button-primary mt-5" @click="save">Save</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      packageAndroid: '',
      pluginData: {},
    }
  },

  created () {
    this.pluginData = window.vemtoApi.getPluginData()
    this.packageAndroid = this.pluginData.packageAndroid
  },

  methods: {
    save () {
      window.vemtoApi.savePluginData({
        packageAndroid: this.packageAndroid
      })
    }
  }
}
</script>
