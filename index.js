export default function (Vue, options) {
    const mount = Vue.prototype.$mount;

    Vue.prototype.$mount = function () {
        let options = this.$options;

        if (options._componentTag) {
            if ((!options.templateOverride || typeof options.templateOverride !== 'string' || options.templateOverride.charAt(0) !== '#')) {
                options.templateOverride = '#Override-' + options._componentTag;
            }

            if (document.querySelector(options.templateOverride)) {
                let renderFunctions = Vue.compile(document.querySelector(options.templateOverride).innerHTML);
                Object.assign(options, renderFunctions);
            }
        }

        return mount.call(this, ...arguments);
    };
}
