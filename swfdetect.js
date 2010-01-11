/*
* swfdetect 0.1 - 24/09/09
* author: Flávio Atas Medeiros - sigmus@gmail.com
*/
var swfdetect = {

    version: 9,
    width: '100%',
    height: '100%',
    alternativeExecuted: false,

    embed: function (cfg) {

        this.addLoadEvent(this.publish(cfg));
    },

    addLoadEvent: function (fn) {

        if (typeof window.onload !== 'function') {
            window.onload = fn;
            return;
        }

        var previousFn = window.onload;

        window.onload = function () {
            previousFn();
            fn();
        };
    },

    publish: function (cfg) {

        if (typeof this.version === 'number') {
            this.version = this.version.toString();
        }

        var that = this;

        return function () {

            swfobject.embedSWF(
				cfg.file,
				cfg.element,
				(cfg.width !== undefined) ? cfg.width : that.width,
				(cfg.height !== undefined) ? cfg.height : that.height,
				that.version,
				null,
				(cfg.flashvars !== undefined) ? cfg.flashvars : null,
				(cfg.params !== undefined) ? cfg.params : null,
				null,
				function (e) { 
					that.checkSuccess(e); 
				}
			);
        };
    },

    checkSuccess: function (event) {

        if (event.success === true || this.alternativeExecuted === true) {
            return;
        }

        this.alternativeExecuted = true;
        this.alternative(event.id);
    },

    alternative: function (id) {

        document.getElementById(id).innerHTML = "<p><strong>Caro usu&aacute;rio, a vers&atilde;o do Adobe Flash Player que voc&ecirc; possui est&aacute; desatualizada.</strong></p><p>Este site utiliza o <a href='http://www.adobe.com/br/products/flashplayer/' target='_blank'>Adobe<sup>&reg;</sup> Flash<sup><font size='-1'>TM</font></sup></a> e est&aacute; preparado para o player com vers&atilde;o a partir da 9, <a href='http://get.adobe.com/br/flashplayer/' target='_blank'>clique aqui</a> para instalar a última versão do flash player.</p>";
    }
};