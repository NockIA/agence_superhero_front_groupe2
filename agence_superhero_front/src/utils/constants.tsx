export const apiUrl = "http://localhost:8000/api/"

export interface link {
    name : string,
    url : string
}

export const navLinks : link[] = [
    {name : "Accueil" , url : "/"},
    {name : "Héros" , url : "/heros"}
]