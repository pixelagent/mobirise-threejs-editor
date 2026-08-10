defineM("threejs-editor", function (jQuery, mbrApp, tr) {
    mbrApp.regExtension({
        name: "threejs-editor",
        events: {
            load: function () {
                var ext = this;

                ext.addFilter("publishHTML", function (html) {
                    if (!html || html.indexOf("data-threejs-external-scripts") === -1) {
                        return html;
                    }

                    var urls = [];
                    var reAttr = /data-threejs-external-scripts="([^"]*)"/g;
                    var m;
                    while ((m = reAttr.exec(html)) !== null) {
                        String(m[1]).split(/\s+/).forEach(function (u) {
                            u = String(u).trim();
                            if (u && urls.indexOf(u) === -1) {
                                urls.push(u);
                            }
                        });
                    }

                    html = html.replace(/\s*data-threejs-external-scripts="[^"]*"/g, "");

                    if (!urls.length) {
                        return html;
                    }

                    var tags = urls.map(function (u) {
                        return '<script src="' + u + '"></script>';
                    }).join("\n");

                    if (/<\/body>/i.test(html)) {
                        html = html.replace(/<\/body>/i, tags + "\n</body>");
                    } else if (/<\/html>/i.test(html)) {
                        html = html.replace(/<\/html>/i, tags + "\n</html>");
                    } else {
                        html = html + "\n" + tags;
                    }

                    return html;
                });
            }
        }
    });
}, ["jQuery", "mbrApp", "TR()"]);
