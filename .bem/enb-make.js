module.exports = function(config) {
    config.node('desktop.bundles/index');

    config.nodeMask(/desktop\.bundles\/.*/, function(nodeConfig) {
        nodeConfig.addTechs([
            new (require('enb/techs/file-provider'))({ target: '?.bemjson.js' }),
            new (require('enb/techs/bemdecl-from-bemjson'))(),
            new (require('enb/techs/levels'))({ levels: getLevels(config) }),
            new (require('enb/techs/deps-old'))(),
            new (require('enb/techs/files'))(),
            new (require('enb/techs/js'))(),
            new (require('enb/techs/css'))(),
            new (require('enb-bemhtml/techs/bemhtml'))(),
            new (require('enb/techs/html-from-bemjson'))()
        ]);
        nodeConfig.addTargets([
            '?.html', '_?.js', '_?.css'
        ]);
    });

    config.mode('development', function() {
        config.nodeMask(/desktop\.bundles\/.*/, function(nodeConfig) {
            nodeConfig.addTechs([
                new (require('enb/techs/file-copy'))({ sourceTarget: '?.js', destTarget: '_?.js' }),
                new (require('enb/techs/file-copy'))({ sourceTarget: '?.css', destTarget: '_?.css' })
            ]);
        });
    });
    config.mode('production', function() {
        config.nodeMask(/desktop\.bundles\/.*/, function(nodeConfig) {
            nodeConfig.addTechs([
                new (require('enb/techs/borschik'))({ sourceTarget: '?.js', destTarget: '_?.js' }),
                new (require('enb/techs/borschik'))({ sourceTarget: '?.css', destTarget: '_?.css' })
            ]);
        });
    });
};

function getLevels(config) {
    return [
        'bem-bl/blocks-common',
        'bem-bl/blocks-desktop',
        'bemhtml/common.blocks',
        'common.blocks',
        'desktop.blocks'
    ].map(function(level) {
        return config.resolvePath(level);
    });
}
