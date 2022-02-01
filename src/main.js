module.exports = (vemto) => {
  return {
    canInstall() {
      return true
    },

    onInstall() {
      vemto.savePluginData({
        packageAndroid: 'com.example'
      })
    },

    beforeCodeGenerationEnd() {
      let pluginData = vemto.getPluginData(), models = vemto.getProjectModels()
      let packageAndroid = pluginData.packageAndroid
      vemto.log.warning(`Generate Android Model`)
      let basePath = 'app/Android', options = { formatAs: 'kt', data: {} }

      models.forEach(model => {
        options.data = {
          model,
          packageAndroid
        }
        vemto.renderTemplate('files/AndroidModel.vemtl', `${basePath}/${model.name.case('pascalCase')}.kt`, options)
      })
    },
  }
}
