export default function ({ $axios, redirect, store }) {
    $axios.interceptors.response.use((response) => {
        return response
    }, error => {
        if (error.response) {
            if (error.response.status === 403) {
                redirect('/logout')
            }
            return error.response
        } else {
            return Promise.reject(error)
        }
    })

    if (process.client) {
        console.log('Build Check')
        $axios.interceptors.response.use(function (response) {
            let serverBuildDate = response.headers['x-build-date']
            if (typeof serverBuildDate === 'undefined' || !serverBuildDate) {
                if (response.config.method === 'get') {
                    document.location.href = response.config.url
                } else {
                    document.location.reload()
                }
            }

            let clientBuildDate = store.state.build_date
            if (serverBuildDate !== clientBuildDate) {
                if (response.config.method === 'get') {
                    document.location.href = response.config.url
                } else {
                    document.location.reload()
                }
            }

            return response
        }, function (error) {
            if (error.response && error.response.status === 401) {
                document.location.href = '/logout'
            }

            return Promise.reject(error)
        })
    }
}
