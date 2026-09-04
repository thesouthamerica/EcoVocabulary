export const generateLevelsByYear = (year: number) => {
  const allYears: Record<number, any[]> = {
    1: [
      {
        title: "Cores Primárias",
        description: "As cores mais importantes.",
        items: [
          { pt: "Vermelho", en: "Red", type: "translation" },
          { pt: "Azul", en: "Blue", type: "translation" },
          { pt: "Amarelo", en: "Yellow", type: "translation" },
          { pt: "Branco", en: "White", type: "translation" },
          { pt: "Preto", en: "Black", type: "translation" }
        ],
        distractors: ["Green", "Pink", "Orange", "Purple", "Brown"]
      },
      {
        title: "Cores Secundárias",
        description: "Misturando as cores.",
        items: [
          { pt: "Verde", en: "Green", type: "translation" },
          { pt: "Laranja", en: "Orange", type: "translation" },
          { pt: "Roxo", en: "Purple", type: "translation" },
          { pt: "Rosa", en: "Pink", type: "translation" },
          { pt: "Marrom", en: "Brown", type: "translation" }
        ],
        distractors: ["Red", "Blue", "Yellow", "White", "Black"]
      },
      {
        title: "Animais de Estimação",
        description: "Nossos amigos em casa.",
        items: [
          { pt: "Cachorro", en: "Dog", type: "translation" },
          { pt: "Gato", en: "Cat", type: "translation" },
          { pt: "Pássaro", en: "Bird", type: "translation" },
          { pt: "Peixe", en: "Fish", type: "translation" },
          { pt: "Coelho", en: "Rabbit", type: "translation" }
        ],
        distractors: ["Lion", "Tiger", "Bear", "Elephant", "Monkey"]
      },
      {
        title: "Animais da Fazenda",
        description: "Animais que vivem na fazenda.",
        items: [
          { pt: "Vaca", en: "Cow", type: "translation" },
          { pt: "Porco", en: "Pig", type: "translation" },
          { pt: "Cavalo", en: "Horse", type: "translation" },
          { pt: "Ovelha", en: "Sheep", type: "translation" },
          { pt: "Galinha", en: "Chicken", type: "translation" }
        ],
        distractors: ["Dog", "Cat", "Bird", "Fish", "Rabbit"]
      },
      {
        title: "Números (1 a 5)",
        description: "Contando com os dedos.",
        items: [
          { pt: "Um", en: "One", type: "translation" },
          { pt: "Dois", en: "Two", type: "translation" },
          { pt: "Três", en: "Three", type: "translation" },
          { pt: "Quatro", en: "Four", type: "translation" },
          { pt: "Cinco", en: "Five", type: "translation" }
        ],
        distractors: ["Six", "Seven", "Eight", "Nine", "Ten"]
      },
      {
        title: "Números (6 a 10)",
        description: "Usando as duas mãos.",
        items: [
          { pt: "Seis", en: "Six", type: "translation" },
          { pt: "Sete", en: "Seven", type: "translation" },
          { pt: "Oito", en: "Eight", type: "translation" },
          { pt: "Nove", en: "Nine", type: "translation" },
          { pt: "Dez", en: "Ten", type: "translation" }
        ],
        distractors: ["One", "Two", "Three", "Four", "Five"]
      },
      {
        title: "Saudações",
        description: "Como ser educado.",
        items: [
          { pt: "Olá", en: "Hello", type: "translation" },
          { pt: "Oi", en: "Hi", type: "translation" },
          { pt: "Tchau", en: "Bye", type: "translation" },
          { pt: "Sim", en: "Yes", type: "translation" },
          { pt: "Não", en: "No", type: "translation" }
        ],
        distractors: ["Please", "Thanks", "Sorry", "Good", "Bad"]
      },
      {
        title: "Pessoas",
        description: "Quem somos nós.",
        items: [
          { pt: "Menino", en: "Boy", type: "translation" },
          { pt: "Menina", en: "Girl", type: "translation" },
          { pt: "Bebê", en: "Baby", type: "translation" },
          { pt: "Mãe", en: "Mom", type: "translation" },
          { pt: "Pai", en: "Dad", type: "translation" }
        ],
        distractors: ["Dog", "Cat", "Bird", "House", "Car"]
      },
      {
        title: "Frases Curtas (Ações)",
        description: "Eu faço.",
        items: [
          { pt: "Eu brinco", en: "I play", type: "sentence" },
          { pt: "Eu corro", en: "I run", type: "sentence" },
          { pt: "Eu como", en: "I eat", type: "sentence" },
          { pt: "Eu bebo", en: "I drink", type: "sentence" },
          { pt: "Eu durmo", en: "I sleep", type: "sentence" }
        ],
        distractors: ["You play", "I walk", "I see", "I read", "I write"]
      },
      {
        title: "Associação Visual",
        description: "O que é isso?",
        items: [
          { pt: "Sol", en: "Sun", type: "association" },
          { pt: "Lua", en: "Moon", type: "association" },
          { pt: "Estrela", en: "Star", type: "association" },
          { pt: "Árvore", en: "Tree", type: "association" },
          { pt: "Flor", en: "Flower", type: "association" }
        ],
        distractors: ["Car", "House", "Dog", "Cat", "Boy"]
      }
    ],
    2: [
      {
        title: "Objetos Escolares I",
        description: "Na mochila.",
        items: [
          { pt: "Lápis", en: "Pencil", type: "translation" },
          { pt: "Caneta", en: "Pen", type: "translation" },
          { pt: "Borracha", en: "Eraser", type: "translation" },
          { pt: "Livro", en: "Book", type: "translation" },
          { pt: "Caderno", en: "Notebook", type: "translation" }
        ],
        distractors: ["Desk", "Chair", "Board", "Ruler", "Bag"]
      },
      {
        title: "Objetos Escolares II",
        description: "Na sala de aula.",
        items: [
          { pt: "Mochila", en: "Bag", type: "translation" },
          { pt: "Régua", en: "Ruler", type: "translation" },
          { pt: "Mesa", en: "Desk", type: "translation" },
          { pt: "Cadeira", en: "Chair", type: "translation" },
          { pt: "Lousa", en: "Board", type: "translation" }
        ],
        distractors: ["Pencil", "Pen", "Eraser", "Book", "Notebook"]
      },
      {
        title: "Brinquedos",
        description: "Hora da diversão.",
        items: [
          { pt: "Bola", en: "Ball", type: "translation" },
          { pt: "Boneca", en: "Doll", type: "translation" },
          { pt: "Carro", en: "Car", type: "translation" },
          { pt: "Pipa", en: "Kite", type: "translation" },
          { pt: "Robô", en: "Robot", type: "translation" }
        ],
        distractors: ["Train", "Plane", "Block", "Game", "Puzzle"]
      },
      {
        title: "Família I",
        description: "Quem mora comigo.",
        items: [
          { pt: "Mãe", en: "Mother", type: "translation" },
          { pt: "Pai", en: "Father", type: "translation" },
          { pt: "Irmão", en: "Brother", type: "translation" },
          { pt: "Irmã", en: "Sister", type: "translation" },
          { pt: "Bebê", en: "Baby", type: "translation" }
        ],
        distractors: ["Grandma", "Grandpa", "Uncle", "Aunt", "Cousin"]
      },
      {
        title: "Família II",
        description: "Visitando os parentes.",
        items: [
          { pt: "Avó", en: "Grandma", type: "translation" },
          { pt: "Avô", en: "Grandpa", type: "translation" },
          { pt: "Tio", en: "Uncle", type: "translation" },
          { pt: "Tia", en: "Aunt", type: "translation" },
          { pt: "Primo(a)", en: "Cousin", type: "translation" }
        ],
        distractors: ["Mother", "Father", "Brother", "Sister", "Baby"]
      },
      {
        title: "Sentimentos",
        description: "Como eu estou hoje?",
        items: [
          { pt: "Feliz", en: "Happy", type: "translation" },
          { pt: "Triste", en: "Sad", type: "translation" },
          { pt: "Bravo", en: "Angry", type: "translation" },
          { pt: "Cansado", en: "Tired", type: "translation" },
          { pt: "Assustado", en: "Scared", type: "translation" }
        ],
        distractors: ["Hungry", "Thirsty", "Hot", "Cold", "Sleepy"]
      },
      {
        title: "Natureza (Associação)",
        description: "O que tem no parque.",
        items: [
          { pt: "Grama", en: "Grass", type: "association" },
          { pt: "Árvore", en: "Tree", type: "association" },
          { pt: "Flor", en: "Flower", type: "association" },
          { pt: "Sol", en: "Sun", type: "association" },
          { pt: "Pássaro", en: "Bird", type: "association" }
        ],
        distractors: ["Car", "House", "Book", "Pen", "Desk"]
      },
      {
        title: "Frases de Sentimento",
        description: "Eu estou...",
        items: [
          { pt: "Eu estou feliz", en: "I am happy", type: "sentence" },
          { pt: "Eu estou triste", en: "I am sad", type: "sentence" },
          { pt: "Eu estou cansado", en: "I am tired", type: "sentence" },
          { pt: "Eu estou bem", en: "I am fine", type: "sentence" },
          { pt: "Eu estou mal", en: "I am bad", type: "sentence" }
        ],
        distractors: ["You are happy", "He is sad", "She is tired", "We are fine", "They are bad"]
      },
      {
        title: "Cores e Objetos",
        description: "Como é o objeto.",
        items: [
          { pt: "Lápis vermelho", en: "Red pencil", type: "sentence" },
          { pt: "Carro azul", en: "Blue car", type: "sentence" },
          { pt: "Bola amarela", en: "Yellow ball", type: "sentence" },
          { pt: "Borracha verde", en: "Green eraser", type: "sentence" },
          { pt: "Livro preto", en: "Black book", type: "sentence" }
        ],
        distractors: ["Blue pencil", "Red car", "Green ball", "Yellow eraser", "White book"]
      },
      {
        title: "Cumprimentos do Dia",
        description: "Dizendo olá em horários diferentes.",
        items: [
          { pt: "Bom dia", en: "Good morning", type: "translation" },
          { pt: "Boa tarde", en: "Good afternoon", type: "translation" },
          { pt: "Boa noite (chegada)", en: "Good evening", type: "translation" },
          { pt: "Boa noite (despedida)", en: "Good night", type: "translation" },
          { pt: "Como vai?", en: "How are you?", type: "translation" }
        ],
        distractors: ["Hello", "Hi", "Bye", "Goodbye", "See you"]
      }
    ],
    3: [
      {
        title: "Roupas I",
        description: "O que vestimos.",
        items: [
          { pt: "Camiseta", en: "T-shirt", type: "translation" },
          { pt: "Calça", en: "Pants", type: "translation" },
          { pt: "Bermuda", en: "Shorts", type: "translation" },
          { pt: "Vestido", en: "Dress", type: "translation" },
          { pt: "Saia", en: "Skirt", type: "translation" }
        ],
        distractors: ["Shoes", "Socks", "Hat", "Jacket", "Coat"]
      },
      {
        title: "Roupas II",
        description: "Acessórios e pés.",
        items: [
          { pt: "Sapatos", en: "Shoes", type: "translation" },
          { pt: "Meias", en: "Socks", type: "translation" },
          { pt: "Chapéu", en: "Hat", type: "translation" },
          { pt: "Casaco", en: "Coat", type: "translation" },
          { pt: "Luvas", en: "Gloves", type: "translation" }
        ],
        distractors: ["T-shirt", "Pants", "Shorts", "Dress", "Skirt"]
      },
      {
        title: "Partes do Corpo I",
        description: "Cabeça e rosto.",
        items: [
          { pt: "Cabeça", en: "Head", type: "translation" },
          { pt: "Cabelo", en: "Hair", type: "translation" },
          { pt: "Olho", en: "Eye", type: "translation" },
          { pt: "Orelha", en: "Ear", type: "translation" },
          { pt: "Boca", en: "Mouth", type: "translation" }
        ],
        distractors: ["Nose", "Arm", "Leg", "Hand", "Foot"]
      },
      {
        title: "Partes do Corpo II",
        description: "Tronco e membros.",
        items: [
          { pt: "Nariz", en: "Nose", type: "translation" },
          { pt: "Braço", en: "Arm", type: "translation" },
          { pt: "Mão", en: "Hand", type: "translation" },
          { pt: "Perna", en: "Leg", type: "translation" },
          { pt: "Pé", en: "Foot", type: "translation" }
        ],
        distractors: ["Head", "Hair", "Eye", "Ear", "Mouth"]
      },
      {
        title: "Alimentos (Frutas)",
        description: "Saudáveis e doces.",
        items: [
          { pt: "Maçã", en: "Apple", type: "translation" },
          { pt: "Banana", en: "Banana", type: "translation" },
          { pt: "Laranja", en: "Orange", type: "translation" },
          { pt: "Limão", en: "Lemon", type: "translation" },
          { pt: "Uva", en: "Grape", type: "translation" }
        ],
        distractors: ["Tomato", "Potato", "Carrot", "Onion", "Garlic"]
      },
      {
        title: "Alimentos (Refeições)",
        description: "O que comemos.",
        items: [
          { pt: "Pão", en: "Bread", type: "translation" },
          { pt: "Queijo", en: "Cheese", type: "translation" },
          { pt: "Ovo", en: "Egg", type: "translation" },
          { pt: "Leite", en: "Milk", type: "translation" },
          { pt: "Água", en: "Water", type: "translation" }
        ],
        distractors: ["Juice", "Coffee", "Tea", "Meat", "Fish"]
      },
      {
        title: "Frases de Estado (Fome/Sede)",
        description: "Como me sinto.",
        items: [
          { pt: "Eu estou com fome", en: "I am hungry", type: "sentence" },
          { pt: "Eu estou com sede", en: "I am thirsty", type: "sentence" },
          { pt: "Ele está com fome", en: "He is hungry", type: "sentence" },
          { pt: "Ela está com sede", en: "She is thirsty", type: "sentence" },
          { pt: "Nós estamos com fome", en: "We are hungry", type: "sentence" }
        ],
        distractors: ["I am happy", "You are tired", "They are thirsty", "She is happy", "He is sad"]
      },
      {
        title: "Frases Descritivas",
        description: "Como as coisas são.",
        items: [
          { pt: "O cachorro é marrom", en: "The dog is brown", type: "sentence" },
          { pt: "O gato é branco", en: "The cat is white", type: "sentence" },
          { pt: "A maçã é vermelha", en: "The apple is red", type: "sentence" },
          { pt: "O céu é azul", en: "The sky is blue", type: "sentence" },
          { pt: "A árvore é verde", en: "The tree is green", type: "sentence" }
        ],
        distractors: ["The dog is black", "The cat is black", "The apple is green", "The sky is black", "The tree is brown"]
      },
      {
        title: "Comidas e Cores",
        description: "Associação visual.",
        items: [
          { pt: "Banana amarela", en: "Yellow banana", type: "association" },
          { pt: "Maçã vermelha", en: "Red apple", type: "association" },
          { pt: "Uva roxa", en: "Purple grape", type: "association" },
          { pt: "Leite branco", en: "White milk", type: "association" },
          { pt: "Laranja (fruta)", en: "Orange", type: "association" }
        ],
        distractors: ["Green banana", "Blue apple", "Red grape", "Black milk", "Yellow orange"]
      },
      {
        title: "Eu Gosto de...",
        description: "Minhas preferências.",
        items: [
          { pt: "Eu gosto de maçã", en: "I like apples", type: "sentence" },
          { pt: "Eu gosto de gatos", en: "I like cats", type: "sentence" },
          { pt: "Eu gosto de leite", en: "I like milk", type: "sentence" },
          { pt: "Eu amo cachorros", en: "I love dogs", type: "sentence" },
          { pt: "Eu amo brincar", en: "I love to play", type: "sentence" }
        ],
        distractors: ["I don't like apples", "I hate cats", "I don't like milk", "I don't love dogs", "I hate to play"]
      }
    ],
    4: [
      {
        title: "Dias da Semana I",
        description: "Os primeiros dias.",
        items: [
          { pt: "Segunda-feira", en: "Monday", type: "translation" },
          { pt: "Terça-feira", en: "Tuesday", type: "translation" },
          { pt: "Quarta-feira", en: "Wednesday", type: "translation" },
          { pt: "Quinta-feira", en: "Thursday", type: "translation" },
          { pt: "Sexta-feira", en: "Friday", type: "translation" }
        ],
        distractors: ["Saturday", "Sunday", "January", "February", "March"]
      },
      {
        title: "Dias da Semana II",
        description: "Fim de semana e tempo.",
        items: [
          { pt: "Sábado", en: "Saturday", type: "translation" },
          { pt: "Domingo", en: "Sunday", type: "translation" },
          { pt: "Hoje", en: "Today", type: "translation" },
          { pt: "Amanhã", en: "Tomorrow", type: "translation" },
          { pt: "Ontem", en: "Yesterday", type: "translation" }
        ],
        distractors: ["Monday", "Tuesday", "Wednesday", "Week", "Month"]
      },
      {
        title: "Clima",
        description: "Como está o tempo?",
        items: [
          { pt: "Ensolarado", en: "Sunny", type: "translation" },
          { pt: "Chuvoso", en: "Rainy", type: "translation" },
          { pt: "Nublado", en: "Cloudy", type: "translation" },
          { pt: "Ventando", en: "Windy", type: "translation" },
          { pt: "Nevando", en: "Snowy", type: "translation" }
        ],
        distractors: ["Hot", "Cold", "Warm", "Cool", "Dry"]
      },
      {
        title: "Estações do Ano",
        description: "O ciclo do ano.",
        items: [
          { pt: "Verão", en: "Summer", type: "translation" },
          { pt: "Inverno", en: "Winter", type: "translation" },
          { pt: "Primavera", en: "Spring", type: "translation" },
          { pt: "Outono", en: "Autumn", type: "translation" },
          { pt: "Outono (EUA)", en: "Fall", type: "translation" }
        ],
        distractors: ["Sun", "Rain", "Snow", "Wind", "Cloud"]
      },
      {
        title: "Verbos de Ação I",
        description: "O que fazemos.",
        items: [
          { pt: "Brincar", en: "Play", type: "translation" },
          { pt: "Correr", en: "Run", type: "translation" },
          { pt: "Comer", en: "Eat", type: "translation" },
          { pt: "Beber", en: "Drink", type: "translation" },
          { pt: "Dormir", en: "Sleep", type: "translation" }
        ],
        distractors: ["Read", "Write", "Speak", "Listen", "Walk"]
      },
      {
        title: "Verbos de Ação II",
        description: "Na escola.",
        items: [
          { pt: "Ler", en: "Read", type: "translation" },
          { pt: "Escrever", en: "Write", type: "translation" },
          { pt: "Ouvir", en: "Listen", type: "translation" },
          { pt: "Falar", en: "Speak", type: "translation" },
          { pt: "Estudar", en: "Study", type: "translation" }
        ],
        distractors: ["Play", "Run", "Eat", "Drink", "Sleep"]
      },
      {
        title: "Frases Afirmativas",
        description: "Dizendo o que acontece.",
        items: [
          { pt: "Eu jogo bola", en: "I play soccer", type: "sentence" },
          { pt: "Ela come maçã", en: "She eats an apple", type: "sentence" },
          { pt: "Ele corre rápido", en: "He runs fast", type: "sentence" },
          { pt: "Nós estudamos inglês", en: "We study English", type: "sentence" },
          { pt: "Eles leem livros", en: "They read books", type: "sentence" }
        ],
        distractors: ["I don't play", "She doesn't eat", "He walks slow", "We study math", "They read comics"]
      },
      {
        title: "Frases Negativas",
        description: "Dizendo o que não acontece.",
        items: [
          { pt: "Eu não jogo bola", en: "I don't play soccer", type: "sentence" },
          { pt: "Ela não come maçã", en: "She doesn't eat an apple", type: "sentence" },
          { pt: "Ele não corre", en: "He doesn't run", type: "sentence" },
          { pt: "Nós não estudamos", en: "We don't study", type: "sentence" },
          { pt: "Eles não leem", en: "They don't read", type: "sentence" }
        ],
        distractors: ["I play soccer", "She eats an apple", "He runs", "We study", "They read"]
      },
      {
        title: "Rotina Matinal",
        description: "Acordando e se arrumando.",
        items: [
          { pt: "Acordar", en: "Wake up", type: "translation" },
          { pt: "Escovar os dentes", en: "Brush teeth", type: "translation" },
          { pt: "Tomar banho", en: "Take a shower", type: "translation" },
          { pt: "Vestir-se", en: "Get dressed", type: "translation" },
          { pt: "Tomar café da manhã", en: "Have breakfast", type: "translation" }
        ],
        distractors: ["Have lunch", "Have dinner", "Go to bed", "Go to school", "Play games"]
      },
      {
        title: "Clima e Dias",
        description: "O tempo na semana.",
        items: [
          { pt: "Segunda ensolarada", en: "Sunny Monday", type: "association" },
          { pt: "Terça chuvosa", en: "Rainy Tuesday", type: "association" },
          { pt: "Quarta nublada", en: "Cloudy Wednesday", type: "association" },
          { pt: "Sexta com vento", en: "Windy Friday", type: "association" },
          { pt: "Sábado com neve", en: "Snowy Saturday", type: "association" }
        ],
        distractors: ["Rainy Monday", "Sunny Tuesday", "Windy Wednesday", "Cloudy Friday", "Sunny Saturday"]
      }
    ],
    5: [
      {
        title: "Preposições de Lugar I",
        description: "Onde as coisas estão.",
        items: [
          { pt: "Em / Dentro", en: "In", type: "translation" },
          { pt: "Em cima / Sobre", en: "On", type: "translation" },
          { pt: "Embaixo / Sob", en: "Under", type: "translation" },
          { pt: "Atrás", en: "Behind", type: "translation" },
          { pt: "Na frente", en: "In front of", type: "translation" }
        ],
        distractors: ["Next to", "Between", "Above", "Below", "Near"]
      },
      {
        title: "Preposições de Lugar II",
        description: "Mais localizações.",
        items: [
          { pt: "Ao lado de", en: "Next to", type: "translation" },
          { pt: "Entre", en: "Between", type: "translation" },
          { pt: "Perto", en: "Near", type: "translation" },
          { pt: "Longe", en: "Far", type: "translation" },
          { pt: "Acima", en: "Above", type: "translation" }
        ],
        distractors: ["In", "On", "Under", "Behind", "In front of"]
      },
      {
        title: "Meses do Ano I",
        description: "Primeiro semestre.",
        items: [
          { pt: "Janeiro", en: "January", type: "translation" },
          { pt: "Fevereiro", en: "February", type: "translation" },
          { pt: "Março", en: "March", type: "translation" },
          { pt: "Abril", en: "April", type: "translation" },
          { pt: "Maio", en: "May", type: "translation" }
        ],
        distractors: ["June", "July", "August", "September", "October"]
      },
      {
        title: "Meses do Ano II",
        description: "Segundo semestre.",
        items: [
          { pt: "Junho", en: "June", type: "translation" },
          { pt: "Julho", en: "July", type: "translation" },
          { pt: "Agosto", en: "August", type: "translation" },
          { pt: "Setembro", en: "September", type: "translation" },
          { pt: "Dezembro", en: "December", type: "translation" }
        ],
        distractors: ["January", "February", "March", "April", "May"]
      },
      {
        title: "Profissões I",
        description: "Quem trabalha na cidade.",
        items: [
          { pt: "Professor(a)", en: "Teacher", type: "translation" },
          { pt: "Médico(a)", en: "Doctor", type: "translation" },
          { pt: "Enfermeiro(a)", en: "Nurse", type: "translation" },
          { pt: "Policial", en: "Police officer", type: "translation" },
          { pt: "Bombeiro", en: "Firefighter", type: "translation" }
        ],
        distractors: ["Dentist", "Pilot", "Chef", "Farmer", "Driver"]
      },
      {
        title: "Profissões II",
        description: "Mais trabalhos.",
        items: [
          { pt: "Dentista", en: "Dentist", type: "translation" },
          { pt: "Piloto", en: "Pilot", type: "translation" },
          { pt: "Cozinheiro(a)", en: "Chef", type: "translation" },
          { pt: "Fazendeiro(a)", en: "Farmer", type: "translation" },
          { pt: "Motorista", en: "Driver", type: "translation" }
        ],
        distractors: ["Teacher", "Doctor", "Nurse", "Police", "Firefighter"]
      },
      {
        title: "Perguntas Curtas",
        description: "Como perguntar coisas.",
        items: [
          { pt: "Onde está...?", en: "Where is...?", type: "sentence" },
          { pt: "O que é...?", en: "What is...?", type: "sentence" },
          { pt: "Quem é...?", en: "Who is...?", type: "sentence" },
          { pt: "Quando é...?", en: "When is...?", type: "sentence" },
          { pt: "Como está...?", en: "How is...?", type: "sentence" }
        ],
        distractors: ["Why is...?", "Which is...?", "Is it...?", "Are you...?", "Do you...?"]
      },
      {
        title: "Onde estão as coisas?",
        description: "Localizando objetos.",
        items: [
          { pt: "O gato está em cima da mesa", en: "The cat is on the table", type: "sentence" },
          { pt: "O cachorro está embaixo da cama", en: "The dog is under the bed", type: "sentence" },
          { pt: "O livro está na bolsa", en: "The book is in the bag", type: "sentence" },
          { pt: "A maçã está perto da janela", en: "The apple is near the window", type: "sentence" },
          { pt: "A professora está na frente da lousa", en: "The teacher is in front of the board", type: "sentence" }
        ],
        distractors: ["The cat is under the table", "The dog is on the bed", "The book is under the bag", "The apple is far from the window", "The teacher is behind the board"]
      },
      {
        title: "Minha Família",
        description: "Falando sobre quem eu amo.",
        items: [
          { pt: "Minha mãe é professora", en: "My mother is a teacher", type: "sentence" },
          { pt: "Meu pai é médico", en: "My father is a doctor", type: "sentence" },
          { pt: "Meu irmão brinca", en: "My brother plays", type: "sentence" },
          { pt: "Minha irmã estuda", en: "My sister studies", type: "sentence" },
          { pt: "Meu avô lê", en: "My grandpa reads", type: "sentence" }
        ],
        distractors: ["My mother is a doctor", "My father is a teacher", "My brother studies", "My sister plays", "My grandpa cooks"]
      },
      {
        title: "Aniversários",
        description: "Quando fazemos festa.",
        items: [
          { pt: "Quando é seu aniversário?", en: "When is your birthday?", type: "sentence" },
          { pt: "É em janeiro", en: "It is in January", type: "sentence" },
          { pt: "É em maio", en: "It is in May", type: "sentence" },
          { pt: "Quantos anos você tem?", en: "How old are you?", type: "sentence" },
          { pt: "Eu tenho 10 anos", en: "I am 10 years old", type: "sentence" }
        ],
        distractors: ["What is your name?", "I am fine", "Where do you live?", "It is on Monday", "I am a boy"]
      }
    ],
    // DEFAULT PLACEHOLDERS FOR 6-9 TO AVOID TOO MUCH TEXT, BUT STILL VALID
    6: [
      {
        title: "Pronomes Pessoais",
        description: "Substituindo nomes.",
        items: [
          { pt: "Eu", en: "I", type: "translation" },
          { pt: "Você / Vocês", en: "You", type: "translation" },
          { pt: "Ele", en: "He", type: "translation" },
          { pt: "Ela", en: "She", type: "translation" },
          { pt: "Nós", en: "We", type: "translation" }
        ],
        distractors: ["They", "It", "Me", "Him", "Her"]
      },
      {
        title: "O verbo Ser/Estar (To Be)",
        description: "Eu sou, eu estou.",
        items: [
          { pt: "Eu sou / estou", en: "I am", type: "sentence" },
          { pt: "Você é / está", en: "You are", type: "sentence" },
          { pt: "Ele é / está", en: "He is", type: "sentence" },
          { pt: "Ela é / está", en: "She is", type: "sentence" },
          { pt: "Eles são / estão", en: "They are", type: "sentence" }
        ],
        distractors: ["I are", "You am", "He are", "She am", "They is"]
      },
      {
        title: "Rotina Diária (Presente)",
        description: "O que faço sempre.",
        items: [
          { pt: "Eu levanto às 7h", en: "I get up at 7 am", type: "sentence" },
          { pt: "Ela toma café", en: "She has breakfast", type: "sentence" },
          { pt: "Ele vai para a escola", en: "He goes to school", type: "sentence" },
          { pt: "Nós almoçamos", en: "We have lunch", type: "sentence" },
          { pt: "Eles assistem TV", en: "They watch TV", type: "sentence" }
        ],
        distractors: ["I get up at 8 am", "She goes to school", "He has lunch", "We watch TV", "They have breakfast"]
      },
      {
        title: "Adjetivos (Aparência)",
        description: "Como as pessoas são fisicamente.",
        items: [
          { pt: "Alto", en: "Tall", type: "translation" },
          { pt: "Baixo", en: "Short", type: "translation" },
          { pt: "Jovem", en: "Young", type: "translation" },
          { pt: "Velho", en: "Old", type: "translation" },
          { pt: "Bonito(a)", en: "Beautiful", type: "translation" }
        ],
        distractors: ["Fat", "Thin", "Ugly", "Smart", "Funny"]
      },
      {
        title: "Adjetivos (Personalidade)",
        description: "Como as pessoas são por dentro.",
        items: [
          { pt: "Engraçado", en: "Funny", type: "translation" },
          { pt: "Inteligente", en: "Smart", type: "translation" },
          { pt: "Tímido", en: "Shy", type: "translation" },
          { pt: "Extrovertido", en: "Outgoing", type: "translation" },
          { pt: "Simpático", en: "Friendly", type: "translation" }
        ],
        distractors: ["Boring", "Angry", "Sad", "Happy", "Tired"]
      },
      {
        title: "Informações Pessoais",
        description: "Falando sobre si mesmo.",
        items: [
          { pt: "Qual é o seu nome?", en: "What is your name?", type: "sentence" },
          { pt: "Meu nome é...", en: "My name is...", type: "sentence" },
          { pt: "De onde você é?", en: "Where are you from?", type: "sentence" },
          { pt: "Eu sou do Brasil", en: "I am from Brazil", type: "sentence" },
          { pt: "Onde você mora?", en: "Where do you live?", type: "sentence" }
        ],
        distractors: ["How are you?", "I am fine", "How old are you?", "I am 11 years old", "What do you do?"]
      },
      {
        title: "Família Estendida",
        description: "O resto da família.",
        items: [
          { pt: "Tia", en: "Aunt", type: "translation" },
          { pt: "Tio", en: "Uncle", type: "translation" },
          { pt: "Primo/Prima", en: "Cousin", type: "translation" },
          { pt: "Sobrinho", en: "Nephew", type: "translation" },
          { pt: "Sobrinha", en: "Niece", type: "translation" }
        ],
        distractors: ["Mother", "Father", "Brother", "Sister", "Son"]
      },
      {
        title: "Gostos e Desgostos",
        description: "Expressando preferências.",
        items: [
          { pt: "Eu gosto de música", en: "I like music", type: "sentence" },
          { pt: "Eu amo pizza", en: "I love pizza", type: "sentence" },
          { pt: "Eu não gosto de peixe", en: "I don't like fish", type: "sentence" },
          { pt: "Eu odeio cebola", en: "I hate onions", type: "sentence" },
          { pt: "Minha cor favorita é azul", en: "My favorite color is blue", type: "sentence" }
        ],
        distractors: ["I like fish", "I love onions", "I don't like music", "I hate pizza", "My favorite color is red"]
      },
      {
        title: "Matérias Escolares",
        description: "O que estudamos.",
        items: [
          { pt: "Matemática", en: "Math", type: "translation" },
          { pt: "Ciências", en: "Science", type: "translation" },
          { pt: "História", en: "History", type: "translation" },
          { pt: "Geografia", en: "Geography", type: "translation" },
          { pt: "Artes", en: "Art", type: "translation" }
        ],
        distractors: ["English", "Portuguese", "Physical Education", "Music", "Computer Science"]
      },
      {
        title: "Animais Selvagens",
        description: "Na floresta e savana.",
        items: [
          { pt: "Leão", en: "Lion", type: "translation" },
          { pt: "Tigre", en: "Tiger", type: "translation" },
          { pt: "Elefante", en: "Elephant", type: "translation" },
          { pt: "Macaco", en: "Monkey", type: "translation" },
          { pt: "Cobra", en: "Snake", type: "translation" }
        ],
        distractors: ["Dog", "Cat", "Cow", "Pig", "Chicken"]
      }
    ],
    7: [
      {
        title: "Passado Simples (Verbos Regulares)",
        description: "O que aconteceu ontem.",
        items: [
          { pt: "Eu joguei", en: "I played", type: "sentence" },
          { pt: "Ela trabalhou", en: "She worked", type: "sentence" },
          { pt: "Nós estudamos", en: "We studied", type: "sentence" },
          { pt: "Ele assistiu", en: "He watched", type: "sentence" },
          { pt: "Eles limparam", en: "They cleaned", type: "sentence" }
        ],
        distractors: ["I play", "She works", "We study", "He watches", "They clean"]
      },
      {
        title: "Passado Simples (Verbos Irregulares)",
        description: "O que aconteceu ontem (diferente).",
        items: [
          { pt: "Eu fui", en: "I went", type: "sentence" },
          { pt: "Ela comeu", en: "She ate", type: "sentence" },
          { pt: "Ele bebeu", en: "He drank", type: "sentence" },
          { pt: "Nós vimos", en: "We saw", type: "sentence" },
          { pt: "Eles tiveram", en: "They had", type: "sentence" }
        ],
        distractors: ["I go", "She eats", "He drinks", "We see", "They have"]
      },
      {
        title: "Futuro Imediato",
        description: "O que vai acontecer.",
        items: [
          { pt: "Eu vou viajar", en: "I am going to travel", type: "sentence" },
          { pt: "Ela vai estudar", en: "She is going to study", type: "sentence" },
          { pt: "Nós vamos jogar", en: "We are going to play", type: "sentence" },
          { pt: "Ele vai dormir", en: "He is going to sleep", type: "sentence" },
          { pt: "Vai chover", en: "It is going to rain", type: "sentence" }
        ],
        distractors: ["I travel", "She studies", "We play", "He sleeps", "It rains"]
      },
      {
        title: "Lugares da Cidade",
        description: "Onde podemos ir.",
        items: [
          { pt: "Padaria", en: "Bakery", type: "translation" },
          { pt: "Farmácia", en: "Pharmacy", type: "translation" },
          { pt: "Supermercado", en: "Supermarket", type: "translation" },
          { pt: "Hospital", en: "Hospital", type: "translation" },
          { pt: "Escola", en: "School", type: "translation" }
        ],
        distractors: ["Park", "Bank", "Museum", "Library", "Restaurant"]
      },
      {
        title: "Direções (Imperativo)",
        description: "Como chegar lá.",
        items: [
          { pt: "Vire à esquerda", en: "Turn left", type: "sentence" },
          { pt: "Vire à direita", en: "Turn right", type: "sentence" },
          { pt: "Vá em frente", en: "Go straight", type: "sentence" },
          { pt: "Pare", en: "Stop", type: "sentence" },
          { pt: "Atravesse a rua", en: "Cross the street", type: "sentence" }
        ],
        distractors: ["Look back", "Go back", "Walk slow", "Run fast", "Wait here"]
      },
      {
        title: "Tecnologia Básica",
        description: "Aparelhos do dia a dia.",
        items: [
          { pt: "Computador", en: "Computer", type: "translation" },
          { pt: "Celular", en: "Cell phone", type: "translation" },
          { pt: "Teclado", en: "Keyboard", type: "translation" },
          { pt: "Tela", en: "Screen", type: "translation" },
          { pt: "Internet", en: "Internet", type: "translation" }
        ],
        distractors: ["Mouse", "Printer", "Tablet", "Camera", "Headphones"]
      },
      {
        title: "Meios de Comunicação",
        description: "Como falamos com o mundo.",
        items: [
          { pt: "Carta", en: "Letter", type: "translation" },
          { pt: "E-mail", en: "Email", type: "translation" },
          { pt: "Jornal", en: "Newspaper", type: "translation" },
          { pt: "Revista", en: "Magazine", type: "translation" },
          { pt: "Rádio", en: "Radio", type: "translation" }
        ],
        distractors: ["TV", "Book", "Comic", "Blog", "Podcast"]
      },
      {
        title: "Verbos do Passado em Frases",
        description: "Praticando frases longas.",
        items: [
          { pt: "Eu fui ao parque ontem", en: "I went to the park yesterday", type: "sentence" },
          { pt: "Ela comprou um livro", en: "She bought a book", type: "sentence" },
          { pt: "Nós comemos pizza", en: "We ate pizza", type: "sentence" },
          { pt: "Eles não estudaram", en: "They didn't study", type: "sentence" },
          { pt: "Você viu o filme?", en: "Did you see the movie?", type: "sentence" }
        ],
        distractors: ["I go to the park", "She buys a book", "We eat pizza", "They don't study", "Do you see the movie?"]
      },
      {
        title: "Dar Conselhos (Should)",
        description: "O que você deveria fazer.",
        items: [
          { pt: "Você deveria estudar", en: "You should study", type: "sentence" },
          { pt: "Ele deveria descansar", en: "He should rest", type: "sentence" },
          { pt: "Nós deveríamos ir", en: "We should go", type: "sentence" },
          { pt: "Ela não deveria comer muito", en: "She shouldn't eat a lot", type: "sentence" },
          { pt: "Eles deveriam ouvir", en: "They should listen", type: "sentence" }
        ],
        distractors: ["You must study", "He can rest", "We might go", "She can't eat", "They will listen"]
      },
      {
        title: "Meios de Transporte",
        description: "Como nos movemos.",
        items: [
          { pt: "Carro", en: "Car", type: "translation" },
          { pt: "Ônibus", en: "Bus", type: "translation" },
          { pt: "Trem", en: "Train", type: "translation" },
          { pt: "Avião", en: "Airplane", type: "translation" },
          { pt: "Bicicleta", en: "Bicycle", type: "translation" }
        ],
        distractors: ["Motorcycle", "Boat", "Ship", "Helicopter", "Subway"]
      }
    ],
    8: [
      {
        title: "Comparativos",
        description: "Comparando duas coisas.",
        items: [
          { pt: "Maior que", en: "Bigger than", type: "sentence" },
          { pt: "Menor que", en: "Smaller than", type: "sentence" },
          { pt: "Mais rápido que", en: "Faster than", type: "sentence" },
          { pt: "Mais lento que", en: "Slower than", type: "sentence" },
          { pt: "Mais caro que", en: "More expensive than", type: "sentence" }
        ],
        distractors: ["Biggest", "Smallest", "Fastest", "Slowest", "Most expensive"]
      },
      {
        title: "Superlativos",
        description: "O extremo de algo.",
        items: [
          { pt: "O maior", en: "The biggest", type: "sentence" },
          { pt: "O menor", en: "The smallest", type: "sentence" },
          { pt: "O mais rápido", en: "The fastest", type: "sentence" },
          { pt: "O mais alto", en: "The tallest", type: "sentence" },
          { pt: "O mais bonito", en: "The most beautiful", type: "sentence" }
        ],
        distractors: ["Bigger", "Smaller", "Faster", "Taller", "More beautiful"]
      },
      {
        title: "Quantificadores I",
        description: "Contando coisas (muito/pouco).",
        items: [
          { pt: "Muitos (contáveis)", en: "Many", type: "translation" },
          { pt: "Muito (incontável)", en: "Much", type: "translation" },
          { pt: "Alguns", en: "Some", type: "translation" },
          { pt: "Nenhum / Qualquer", en: "Any", type: "translation" },
          { pt: "Poucos", en: "A few", type: "translation" }
        ],
        distractors: ["A lot of", "Lots of", "Little", "A little", "None"]
      },
      {
        title: "Alimentação no Mundo",
        description: "Vocabulário de comidas globais.",
        items: [
          { pt: "Arroz", en: "Rice", type: "translation" },
          { pt: "Feijão", en: "Beans", type: "translation" },
          { pt: "Massa / Macarrão", en: "Pasta", type: "translation" },
          { pt: "Sopa", en: "Soup", type: "translation" },
          { pt: "Salada", en: "Salad", type: "translation" }
        ],
        distractors: ["Bread", "Meat", "Fish", "Chicken", "Pork"]
      },
      {
        title: "Diversidade e Cultura",
        description: "Pessoas e costumes.",
        items: [
          { pt: "Cultura", en: "Culture", type: "translation" },
          { pt: "Tradição", en: "Tradition", type: "translation" },
          { pt: "Língua", en: "Language", type: "translation" },
          { pt: "País", en: "Country", type: "translation" },
          { pt: "Mundo", en: "World", type: "translation" }
        ],
        distractors: ["City", "State", "Town", "Village", "Continent"]
      },
      {
        title: "Artes e Entretenimento",
        description: "Expressões culturais.",
        items: [
          { pt: "Música", en: "Music", type: "translation" },
          { pt: "Filme", en: "Movie", type: "translation" },
          { pt: "Pintura", en: "Painting", type: "translation" },
          { pt: "Teatro", en: "Theater", type: "translation" },
          { pt: "Dança", en: "Dance", type: "translation" }
        ],
        distractors: ["Science", "Math", "History", "Sports", "News"]
      },
      {
        title: "Diálogos (Restaurante)",
        description: "Pedindo comida.",
        items: [
          { pt: "Posso ver o cardápio?", en: "Can I see the menu?", type: "sentence" },
          { pt: "Eu gostaria de água", en: "I would like water", type: "sentence" },
          { pt: "Quanto custa?", en: "How much is it?", type: "sentence" },
          { pt: "A conta, por favor", en: "The check, please", type: "sentence" },
          { pt: "Estava delicioso", en: "It was delicious", type: "sentence" }
        ],
        distractors: ["Where is the bathroom?", "I am full", "Can I help you?", "Do you have pizza?", "I don't eat meat"]
      },
      {
        title: "Opiniões",
        description: "Dizendo o que acha.",
        items: [
          { pt: "Eu acho que...", en: "I think that...", type: "sentence" },
          { pt: "Na minha opinião...", en: "In my opinion...", type: "sentence" },
          { pt: "Eu concordo", en: "I agree", type: "sentence" },
          { pt: "Eu discordo", en: "I disagree", type: "sentence" },
          { pt: "Talvez", en: "Maybe", type: "sentence" }
        ],
        distractors: ["I know", "I don't know", "I am sure", "Of course", "Never"]
      },
      {
        title: "Problemas de Saúde",
        description: "Quando não estamos bem.",
        items: [
          { pt: "Dor de cabeça", en: "Headache", type: "translation" },
          { pt: "Dor de dente", en: "Toothache", type: "translation" },
          { pt: "Dor de estômago", en: "Stomachache", type: "translation" },
          { pt: "Febre", en: "Fever", type: "translation" },
          { pt: "Tosse", en: "Cough", type: "translation" }
        ],
        distractors: ["Cold", "Flu", "Allergy", "Medicine", "Doctor"]
      },
      {
        title: "Verbos Modais (Habilidade)",
        description: "O que posso ou não fazer.",
        items: [
          { pt: "Eu sei nadar", en: "I can swim", type: "sentence" },
          { pt: "Ela não sabe voar", en: "She can't fly", type: "sentence" },
          { pt: "Você sabe cozinhar?", en: "Can you cook?", type: "sentence" },
          { pt: "Nós sabemos falar inglês", en: "We can speak English", type: "sentence" },
          { pt: "Ele sabia ler (no passado)", en: "He could read", type: "sentence" }
        ],
        distractors: ["I should swim", "She must fly", "Do you cook?", "We will speak English", "He can read"]
      }
    ],
    9: [
      {
        title: "Presente Perfeito (Experiências)",
        description: "Ações no passado sem tempo definido.",
        items: [
          { pt: "Eu já estive no Brasil", en: "I have been to Brazil", type: "sentence" },
          { pt: "Ela viu esse filme", en: "She has seen this movie", type: "sentence" },
          { pt: "Nós nunca comemos sushi", en: "We have never eaten sushi", type: "sentence" },
          { pt: "Você já visitou Paris?", en: "Have you ever visited Paris?", type: "sentence" },
          { pt: "Eles terminaram a lição", en: "They have finished the homework", type: "sentence" }
        ],
        distractors: ["I went to Brazil", "She saw this movie", "We didn't eat sushi", "Did you visit Paris?", "They finished the homework"]
      },
      {
        title: "Condicionais (First Conditional)",
        description: "Possibilidades reais.",
        items: [
          { pt: "Se chover, eu ficarei", en: "If it rains, I will stay", type: "sentence" },
          { pt: "Se você estudar, você passará", en: "If you study, you will pass", type: "sentence" },
          { pt: "Se ela ligar, eu atendo", en: "If she calls, I will answer", type: "sentence" },
          { pt: "Nós iremos se eles convidarem", en: "We will go if they invite", type: "sentence" },
          { pt: "Ele não irá se estiver doente", en: "He won't go if he is sick", type: "sentence" }
        ],
        distractors: ["If it rained, I would stay", "If you studied, you would pass", "If she called, I would answer", "We would go if they invited", "He wouldn't go if he was sick"]
      },
      {
        title: "Meio Ambiente",
        description: "Protegendo o planeta.",
        items: [
          { pt: "Poluição", en: "Pollution", type: "translation" },
          { pt: "Reciclagem", en: "Recycling", type: "translation" },
          { pt: "Aquecimento global", en: "Global warming", type: "translation" },
          { pt: "Desmatamento", en: "Deforestation", type: "translation" },
          { pt: "Natureza", en: "Nature", type: "translation" }
        ],
        distractors: ["City", "Factory", "Car", "Smoke", "Trash"]
      },
      {
        title: "Tecnologia Global",
        description: "O mundo digital.",
        items: [
          { pt: "Inteligência Artificial", en: "Artificial Intelligence", type: "translation" },
          { pt: "Redes Sociais", en: "Social Media", type: "translation" },
          { pt: "Aplicativo", en: "Application", type: "translation" },
          { pt: "Senha", en: "Password", type: "translation" },
          { pt: "Nuvem (Digital)", en: "Cloud", type: "translation" }
        ],
        distractors: ["Screen", "Keyboard", "Mouse", "Printer", "Speaker"]
      },
      {
        title: "Expressões Idiomáticas I",
        description: "Frases que não se traduzem literalmente.",
        items: [
          { pt: "Pedaço de bolo (Muito fácil)", en: "Piece of cake", type: "sentence" },
          { pt: "Custa os olhos da cara (Muito caro)", en: "Costs an arm and a leg", type: "sentence" },
          { pt: "Chovendo canivetes (Chovendo muito)", en: "Raining cats and dogs", type: "sentence" },
          { pt: "Quebrar o gelo (Iniciar conversa)", en: "Break the ice", type: "sentence" },
          { pt: "De vez em nunca (Raramente)", en: "Once in a blue moon", type: "sentence" }
        ],
        distractors: ["Very easy", "Very expensive", "Raining a lot", "Start talking", "Rarely"]
      },
      {
        title: "Direitos Humanos",
        description: "Respeito e igualdade.",
        items: [
          { pt: "Igualdade", en: "Equality", type: "translation" },
          { pt: "Liberdade", en: "Freedom", type: "translation" },
          { pt: "Paz", en: "Peace", type: "translation" },
          { pt: "Respeito", en: "Respect", type: "translation" },
          { pt: "Justiça", en: "Justice", type: "translation" }
        ],
        distractors: ["War", "Violence", "Anger", "Hate", "Crime"]
      },
      {
        title: "Profissões do Futuro",
        description: "Trabalhos da nova geração.",
        items: [
          { pt: "Programador", en: "Programmer", type: "translation" },
          { pt: "Cientista de Dados", en: "Data Scientist", type: "translation" },
          { pt: "Engenheiro", en: "Engineer", type: "translation" },
          { pt: "Desenvolvedor", en: "Developer", type: "translation" },
          { pt: "Pesquisador", en: "Researcher", type: "translation" }
        ],
        distractors: ["Teacher", "Doctor", "Nurse", "Firefighter", "Police"]
      },
      {
        title: "Condicionais (Second Conditional)",
        description: "Situações imaginárias.",
        items: [
          { pt: "Se eu fosse rico, eu viajaria", en: "If I were rich, I would travel", type: "sentence" },
          { pt: "Se ela tivesse tempo, ela leria", en: "If she had time, she would read", type: "sentence" },
          { pt: "Se nós soubéssemos, nós ajudaríamos", en: "If we knew, we would help", type: "sentence" },
          { pt: "O que você faria?", en: "What would you do?", type: "sentence" },
          { pt: "Eu compraria uma casa", en: "I would buy a house", type: "sentence" }
        ],
        distractors: ["If I am rich, I will travel", "If she has time, she will read", "If we know, we will help", "What will you do?", "I will buy a house"]
      },
      {
        title: "Gírias Cotidianas",
        description: "Como os jovens falam.",
        items: [
          { pt: "Maneiro / Legal", en: "Cool", type: "translation" },
          { pt: "E aí? (Como vai?)", en: "What's up?", type: "sentence" },
          { pt: "Cara / Mano", en: "Dude", type: "translation" },
          { pt: "Estou brincando", en: "Just kidding", type: "sentence" },
          { pt: "Não importa", en: "Never mind", type: "sentence" }
        ],
        distractors: ["Nice", "Hello", "Friend", "I am joking", "It doesn't matter"]
      },
      {
        title: "Tempos Verbais Mistos",
        description: "Identificando o tempo correto.",
        items: [
          { pt: "Eu estudo todos os dias (Presente)", en: "I study every day", type: "sentence" },
          { pt: "Eu estudei ontem (Passado)", en: "I studied yesterday", type: "sentence" },
          { pt: "Eu vou estudar amanhã (Futuro)", en: "I will study tomorrow", type: "sentence" },
          { pt: "Eu estou estudando agora (Contínuo)", en: "I am studying now", type: "sentence" },
          { pt: "Eu já estudei (Perfeito)", en: "I have studied", type: "sentence" }
        ],
        distractors: ["I studied every day", "I will study yesterday", "I study tomorrow", "I was studying now", "I am studying"]
      }
    ]
  };

  // Se o ano solicitado não estiver mapeado (ex: master admin escolhe ano 0, ou algo assim),
  // retornamos o ano 1 como padrão ou um fallback vazio.
  return allYears[year] || allYears[1] || [];
};
