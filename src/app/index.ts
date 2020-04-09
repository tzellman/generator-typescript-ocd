import Generator from 'yeoman-generator';

interface Dictionary {
    [k: string]: unknown;
}

export default class extends Generator {
    private variables: Dictionary = {};

    async prompting() {
        const answers = await this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'package name',
                default: this.appname.replace(/\s+/g, '-')
            },
            {
                type: 'input',
                name: 'version',
                message: 'version',
                default: '0.1.0-alpha.0'
            },
            {
                type: 'input',
                name: 'description',
                message: 'description',
                default: (answers: Dictionary) => `The ${answers.name} project`
            },
            {
                type: 'input',
                name: 'author',
                message: 'author',
                default: ''
            },
            {
                type: 'input',
                name: 'email',
                message: 'email',
                default: '',
                when: (answers: Dictionary) => !!answers.author
            },
            {
                type: 'input',
                name: 'license',
                message: 'license',
                default: 'ISC'
            }
        ]);

        this.variables = { ...answers };
        this.log(`variables: ${JSON.stringify(this.variables)}`);
    }

    writing() {
        this._generate('.lintstagedrc.js');
        this._generate('.prettierrc');
        this._generate('_gitignore');
        this._generate('_prettierignore');
    }

    private _generate(templatePath: string, destinationPath?: string) {
        if (!destinationPath) {
            destinationPath = templatePath;
            if (/^_[^.]+$/.test(destinationPath)) {
                destinationPath = destinationPath.replace(/^_/, '.');
            }
        }
        this.fs.copyTpl(
            this.templatePath(templatePath),
            this.destinationPath(destinationPath || templatePath),
            this.variables
        );
    }
}
