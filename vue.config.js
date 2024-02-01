const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    lintOnSave: false,
    transpileDependencies: [
        'vuetify',
    ],
    css: {
        extract: { ignoreOrder: true },
        loaderOptions: {
            sass: {
                additionalData: "@import '~@/assets/scss/vuetify/variables'",
            },
            scss: {
                additionalData: "@import '~@/assets/scss/vuetify/variables';",
                  
            },
                
        },
          
    },
})