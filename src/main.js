module.exports = (vemto) => {
  return {
    crudRepository: [],

    canInstall() {
      return true
    },

    onInstall() {
      vemto.savePluginData({
        packageAndroid: 'com.example',
        roomDB: false,
      })
    },

    beforeCodeGenerationEnd() {
      let pluginData = vemto.getPluginData(),
          models = vemto.getProjectModels(),
          projectCruds = vemto.getProject().getMainCruds()

      let roomDB = pluginData.roomDB
      let packageAndroid = pluginData.packageAndroid
      let apiHelperUrls = []

      let apiPath = 'api'
      let appPath = 'app'
      let layoutPath = 'layouts'
      let routePath = 'routes'
      let entityPath = 'entity'
      let responsesPath = 'responses'
      let helperPath = 'helpers'
      let repositoriesPath = 'repositories'
      let servicesPath = 'services'

      vemto.log.warning(`Generate Android MVVM Architecture for ${models.length} models`)
      let basePath = 'app/Android', options = { formatAs: 'kt', data: {} }
      //const apiHelperUrls = []

      models.forEach(model => {
        options.data = {
          model,
          roomDB,
          packageAndroid
        }

        vemto.renderTemplate('files/AndroidApp.vemtl', `${basePath}/${appPath}/AndroidApp.kt`, options)
        vemto.renderTemplate('files/AndroidHFKtorHttpClient.vemtl', `${basePath}/${apiPath}/HFKtorHttpClient.kt`, options)
        vemto.renderTemplate('files/AndroidEntity.vemtl', `${basePath}/${entityPath}/${model.name.case('pascalCase')}Entity.kt`, options)
        vemto.renderTemplate('files/AndroidRoutes.vemtl', `${basePath}/${routePath}/${model.name.case('pascalCase')}Routes.kt`, options)
        vemto.renderTemplate('files/AndroidService.vemtl', `${basePath}/${servicesPath}/${model.name.case('pascalCase')}Service.kt`, options)
        vemto.renderTemplate('files/AndroidResponse.vemtl', `${basePath}/${entityPath}/${responsesPath}/${model.name.case('pascalCase')}Response.kt`, options)
        vemto.renderTemplate('files/AndroidRepository.vemtl', `${basePath}/${repositoriesPath}/${model.name.case('pascalCase')}Repository.kt`, options)
        vemto.renderTemplate('files/AndroidDeleteResponse.vemtl', `${basePath}/${entityPath}/${responsesPath}/${model.name.case('pascalCase')}DeleteResponse.kt`, options)

        apiHelperUrls.push({
          model: `${model.name.case('pascalCase')}`,
          get: `${model.name.toLowerCase()}s/list`,
          create: `${model.name.toLowerCase()}s/create`,
          update: `${model.name.toLowerCase()}s/update`,
          delete: `${model.name.toLowerCase()}s/delete`
        })
      })

      projectCruds.forEach(crud => {
        const name = crud.name;
        options.data = {
          crud,
          name,
        }

        vemto.renderTemplate('files/AndroidLayout.vemtl', `${basePath}/${layoutPath}/${crud.url.replace(/-/g, "_")}_layout.xml`, options)
      })

      /**
       * Generate Api urls.
       */
      options.data = {
        packageAndroid,
        apiHelperUrls
      }

      vemto.renderTemplate('files/AndroidApiHelper.vemtl', `${basePath}/${helperPath}/ApiHelper.kt`, options)
      vemto.renderTemplate('files/AndroidGradle.vemtl', `${basePath}/build.gradle.kts`)
    },

  }
}
