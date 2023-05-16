<template>
  <div class="w-full">
    <label for="package">Please insert in <code class="text-rose-700">package</code> name</label>
    <input class="input" type="text" id="package" v-model="packageAndroid"/>

    <div class="mt-4">
      <label class="inline-flex items-center">
        <input type="checkbox" class="form-checkbox" v-model="serialized" @change="save">
        <span class="ml-2">Activate Serialized Name</span>
      </label>
    </div>

    <div class="mt-4">
      <label class="inline-flex items-center">
        <input type="checkbox" class="form-checkbox" v-model="roomDB" @change="save">
        <span class="ml-2">Activate Room Database</span>
      </label>
    </div>

    <button class="button-primary mt-5" @click="save">Save</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      packageAndroid: '',
      roomDB: false,
      pluginData: {},
    }
  },

  created () {
    this.pluginData = window.vemtoApi.getPluginData()
    this.packageAndroid = this.pluginData.packageAndroid
    this.roomDB = this.pluginData.roomDB
  },

  methods: {
    save () {
      window.vemtoApi.savePluginData({
        packageAndroid: this.packageAndroid,
        roomDB: this.roomDB
      })
    }
  }
}
</script>
