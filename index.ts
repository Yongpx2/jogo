//esse codigo é MUITO mal feito, demorei eras pra fazer, mas funciona, entao ta otimo


import { createInterface, Interface } from "readline/promises";

let caminho = "";


const term: Interface = createInterface({
    input: process.stdin,
    output: process.stdout
});

const perg = await term.question("Qual a profundidade? (padrão 3): ");

let prof: number;

if (perg.trim() === "") {
    prof = 3;
} else {
    prof = Number(perg);
}


const tamanho = 2 ** (prof + 2);
const mapa: string[][] = [];

for (let i = 0; i < tamanho; i++) {
    mapa[i] = [];
        for (let j = 0; j < tamanho; j++) {
        mapa[i]![j] = " ";
    }
}





enum dir { N, L, S, O };


let direcao: dir = dir.L;

interface Ponto2D {
    x: number;
    y: number;
}

let pos: Ponto2D = {
    x: 0,
    y: tamanho - 1
};

let posant:Ponto2D = {
    x: -1,
    y: tamanho - 1
};

function interA(profundidade: number): void {
if (profundidade <= 0) {return;}
caminho += "e";
interB(profundidade - 1);
interFrente();
caminho += "d";
interA(profundidade - 1);
interFrente();
interA(profundidade - 1);
caminho += "d";
interFrente();
interB(profundidade - 1);
caminho += "e";
}

function interB(profundidade: number): void {
if (profundidade <= 0) {return;}
caminho += "d";
interA(profundidade - 1);
interFrente();
caminho += "e";
interB(profundidade - 1);
interFrente();
interB(profundidade - 1);
caminho += "e";
interFrente();
interA(profundidade - 1);
caminho += "d";
}

function interFrente(): void {
caminho += "f";
}

interA(prof+1);
caminho += "f";
console.log(caminho);

for (let i = 0; i < caminho.length; i++) {
    switch (caminho[i]) {
        case "e":
            
            direcao = (direcao + 3) % 4;
            break;
        case "d":
            
            direcao = (direcao + 1) % 4;
            break;
        case "f":
            switch (direcao) {
                case dir.N:
                    if ((posant.x === pos.x - 1) && (posant.y === pos.y)) {
                        mapa[pos.y]![pos.x] = "┘";
                    } else if ((posant.x === pos.x +1) && (posant.y === pos.y)) {
                        mapa[pos.y]![pos.x] = "└";
                    } else {
                        mapa[pos.y]![pos.x] = "│";
                    }

                    posant = { ...pos };
                    pos.y--;
                    break;
                case dir.L:
                    if ((posant.y === pos.y + 1) && (posant.x === pos.x)) {
                        mapa[pos.y]![pos.x] = "┌";
                    } else if ((posant.y === pos.y - 1) && (posant.x === pos.x)) {
                        mapa[pos.y]![pos.x] = "└";
                    } else {
                        mapa[pos.y]![pos.x] = "─";
                    }
                    posant = { ...pos };
                    pos.x++;
                    break;
                case dir.S:
                    if ((posant.x === pos.x - 1) && (posant.y === pos.y)) {
                        mapa[pos.y]![pos.x] = "┐";
                    } else if ((posant.x === pos.x + 1) && (posant.y === pos.y)) {
                        mapa[pos.y]![pos.x] = "┌";
                    } else {
                        mapa[pos.y]![pos.x] = "│";
                    }
                    posant = { ...pos };
                    pos.y++;
                    break;
                case dir.O:
                    if ((posant.y === pos.y - 1) && (posant.x === pos.x)) {
                        mapa[pos.y]![pos.x] = "┘";
                    } else if ((posant.y === pos.y + 1) && (posant.x === pos.x)) {
                        mapa[pos.y]![pos.x] = "┐";
                    } else {
                        mapa[pos.y]![pos.x] = "─";
                    }
                    posant = { ...pos };
                    pos.x--;
                    break;
            }
            break;
        
    }
}

for (let i = 0; i < tamanho; i++) {
    let linha = "";
    for (let j = 0; j < tamanho; j++) {
        linha += mapa[i]![j];
    }
    console.log(linha);
}   
term.close();