/* eslint-disable no-undef */
window.onload = function() {
  window["SwaggerUIBundle"] = window["swagger-ui-bundle"]
  window["SwaggerUIStandalonePreset"] = window["swagger-ui-standalone-preset"]
  // Build a system
      const ui = SwaggerUIBundle({
        urls: [
          {
            url: "https://raw.githubusercontent.com/LandRegistry/sign-your-mortgage-documentation/gh-pages/schema.yaml",
            name: "deed-api" 
          },
          {
            url: "https://raw.githubusercontent.com/LandRegistry/sign-your-mortgage-documentation/gh-pages/organisation-api-schema.yaml",
            name: "organisation-api"
          }
        ],
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl,
          function UrlParamDisablePlugin() {
            return {
              statePlugins: {
                spec: {
                  wrapActions: {
                    // Remove the ?url parameter from loading an external OpenAPI definition.
                    updateUrl: (oriAction) => (payload) => {
                      const url = new URL(window.location.href)
                      if (url.searchParams.has('url')) {
                        url.searchParams.delete('url')
                        window.location.replace(url.toString())
                      }
                      return oriAction(payload)
                    }
                  }
                }
              }
            }
          }
        ],
        layout: "StandaloneLayout"
      })

  window.ui = ui

  ui.initOAuth({
    clientId: "your-client-id",
    clientSecret: "your-client-secret-if-required",
    realm: "your-realms",
    appName: "your-app-name",
    scopeSeparator: " ",
    scopes: "openid profile email phone address",
    additionalQueryStringParams: {},
    useBasicAuthenticationWithAccessCodeGrant: false,
    usePkceWithAuthorizationCodeGrant: false
  })
}
