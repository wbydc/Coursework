const fs = require('fs');
const path = require('path');

class Logger {
    constructor(options) {
        this.options = options;
    }

    log(level, ...data) {
        if (!(level in ['info', 'error'])) level = 'info';
        let formated = this.format(level, data);

        if (this.options.console) console[level](formated);
        this.options.queue(level, formated);
    }
    info(...data) {
        this.log('info', ...data);
    }
    error(...data) {
        this.log('error', ...data);
    }

    format(level, data) {
        let message = data.map(argument => {
            if (typeof argument === 'object') argument = JSON.stringify(argument);
            if (typeof argument === 'function') argument = argument.toSource();
            if (typeof argument === 'boolean') argument = argument ? 'true' : 'false';
            return argument;
        }).join(' ');

        let formated = (typeof this.options.format == 'function' ? this.options.format() : this.options.format.toString())
            .replace('%level%', level)
            .replace('%source%', this.options.source)
            .replace('%date%', this.options.date())
            .replace('%data%', message);

        return formated;
    }
}
class LoggerFactory {
    constructor(options = {}) {
        this.options = Object.assign({}, {
            logger: {
                console: true,
                date: () => new Date().toLocaleString('ru-RU'),
                format: '[%date%][%source%][%level%] %data%',
            },
            path: 'all.log',
            timeout: 3000
        }, options);
        this._queue = {
            info: [],
            error: []
        };

        for (let level in this._queue) {
            let file = (typeof this.options.path == 'function' ? this.options.path() : this.options.path.toString()).replace('%level%', level);
            if (!fs.existsSync(path.dirname(file))) {
                fs.mkdirSync(path.dirname(file), {
                    recursive: true
                });
            }
            if (!fs.existsSync(file)) {
                fs.writeFileSync(file, '');
            }
        }

        this.write();
    }

    new(source) {
        let options = Object.assign({}, this.options.logger, {
            source,
            queue: this.queue.bind(this)
        });
        return new Logger(options);
    }

    queue(level, message) {
        this._queue[level].push(message);
    }
    write() {
        let queue = Object.assign({}, this._queue);
        this._queue = {
            info: [],
            error: []
        };

        for (let level in queue) {
            let log = queue[level].reduce((a, v) => a += v + '\n', '');
            let file = (typeof this.options.path == 'function' ? this.options.path() : this.options.path.toString()).replace('%level%', level);

            fs.appendFileSync(file, log);
        }

        this.timeout = setTimeout(this.write.bind(this), this.options.timeout);
    }
}

module.exports = {
    Logger,
    LoggerFactory
};