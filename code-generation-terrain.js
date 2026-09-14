(function (Scratch) {
    'use strict';

    class GeradorTerreno {
        constructor() {
            this.altura = 0;
        }

        getInfo() {
            return {
                id: 'geradorterreno',
                name: 'Gerador de Terreno',
                color1: '#059669',

                blocks: [
                    {
                        opcode: 'calcular',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'calcular terreno X [X] Z [Z] semente [SEED]',
                        arguments: {
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Z: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            SEED: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 12345
                            }
                        }
                    },
                    {
                        opcode: 'resultado',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'altura calculada',
                        disableMonitor: true
                    }
                ]
            };
        }

        calcular(args) {
            const escala = 30;

            const x = Number(args.X) / escala;
            const z = Number(args.Z) / escala;
            const seed = Number(args.SEED);

            const x0 = Math.floor(x);
            const x1 = x0 + 1;
            const z0 = Math.floor(z);
            const z1 = z0 + 1;

            const fx = x - x0;
            const fz = z - z0;

            const sx = fx * fx * (3 - 2 * fx);
            const sz = fz * fz * (3 - 2 * fz);

            const canto00 = this.hash2D(x0, z0, seed);
            const canto10 = this.hash2D(x1, z0, seed);
            const canto01 = this.hash2D(x0, z1, seed);
            const canto11 = this.hash2D(x1, z1, seed);

            const superior =
                canto00 + sx * (canto10 - canto00);

            const inferior =
                canto01 + sx * (canto11 - canto01);

            const resultado =
                superior + sz * (inferior - superior);

            this.altura = resultado * 120;
        }

        hash2D(x, z, seed) {
            const h =
                Math.sin(
                    x * 12.9898 +
                    z * 78.233 +
                    seed * 43758.5453
                ) * 43758.5453123;

            return h - Math.floor(h);
        }

        resultado() {
            return this.altura;
        }
    }

    Scratch.extensions.register(new GeradorTerreno());

})(Scratch);