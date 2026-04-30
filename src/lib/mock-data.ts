import { Company, ProjectData } from "./types";

export const MOCK_COMPANIES: Company[] = [
    {
        id: "1",
        name: "ÉcoMatériaux Pro",
        image: "/companies/eco-materiaux.jpg",
        description:
            "Leader en matériaux de construction écologiques et durables. Nous fournissons des solutions innovantes pour les bâtiments à haute performance énergétique depuis plus de 15 ans.",
        location: "Paris, France",
        website: "www.ecomateriaux.fr",
        email: "contact@ecomateriaux.fr",
        phone: "+33 1 23 45 67 89",
        specialties: ["Isolation", "Bois certifié", "Matériaux biosourcés"],
        subscription: "enterprise",
        products: [
            {
                id: "p1",
                name: "IsoNature Plus",
                category: "Isolation Thermique",
                characteristics: [
                    "Conductivité thermique: 0.035 W/m·K",
                    "Épaisseur: 100-200mm",
                    "Résistance au feu: A2-s1,d0",
                    "100% recyclable",
                ],
                certification: {
                    name: "ACERMI",
                    level: "A+",
                    description:
                        "Impact environnemental minimal — Matériau naturel biosourcé, faible énergie grise, 100% recyclable en fin de vie.",
                },
                description:
                    "Panneau isolant haute performance en fibre de bois. Idéal pour l'isolation intérieure et extérieure des bâtiments résidentiels et tertiaires. Compatible avec les systèmes ITE et ITI.",
                price: "25€/m²",
            },
            {
                id: "p2",
                name: "SolarTek Premium",
                category: "Panneaux Solaires",
                characteristics: [
                    "Puissance: 400W",
                    "Rendement: 22.5%",
                    "Garantie: 30 ans",
                    "Technologie bifaciale",
                ],
                certification: {
                    name: "TÜV Rheinland",
                    level: "A",
                    description:
                        "Très faible impact environnemental — Production d'énergie renouvelable, recyclable à 95%, fabriqué avec énergie verte.",
                },
                description:
                    "Panneau solaire photovoltaïque monocristallin de dernière génération avec technologie bifaciale pour maximiser la production d'énergie.",
                price: "350€/unité",
            },
            {
                id: "p3",
                name: "BioEnduit Naturel",
                category: "Peintures Écologiques",
                characteristics: [
                    "Sans COV",
                    "Base chaux naturelle",
                    "Résistant à l'humidité",
                    "Perméable à la vapeur d'eau",
                ],
                certification: {
                    name: "Écolabel Européen",
                    level: "A+",
                    description:
                        "Impact environnemental minimal — Sans composés organiques volatils, matières premières naturelles, biodégradable.",
                },
                description:
                    "Enduit décoratif 100% naturel à base de chaux et pigments minéraux. Régule naturellement l'humidité et purifie l'air intérieur.",
                price: "18€/kg",
            },
        ],
    },
    {
        id: "2",
        name: "GreenBuild Solutions",
        image: "/companies/greenbuild.jpg",
        description:
            "Spécialiste des solutions de construction verte et des systèmes de gestion de l'énergie pour les bâtiments neufs et en rénovation.",
        location: "Lyon, France",
        website: "www.greenbuild.fr",
        email: "info@greenbuild.fr",
        phone: "+33 4 56 78 90 12",
        specialties: ["Ventilation", "Énergie", "Domotique"],
        subscription: "professional",
        products: [
            {
                id: "p4",
                name: "VentilAir Eco",
                category: "Systèmes de Ventilation",
                characteristics: [
                    "VMC double flux",
                    "Rendement: 92%",
                    "Débit: 150-350 m³/h",
                    "Filtration F7",
                ],
                certification: {
                    name: "NF VMC",
                    level: "A",
                    description:
                        "Très faible impact — Haute efficacité énergétique, moteur basse consommation (EC), filtration haute performance.",
                },
                description:
                    "Système de ventilation mécanique contrôlée double flux avec récupération de chaleur. Idéal pour les maisons passives et RT2020.",
                price: "2800€/système",
            },
            {
                id: "p5",
                name: "TerraFloor Natural",
                category: "Revêtements de Sol",
                characteristics: [
                    "Bambou certifié FSC",
                    "Épaisseur: 15mm",
                    "Dureté Brinell: 4.0",
                    "Traitement huile naturelle",
                ],
                certification: {
                    name: "FSC",
                    level: "B",
                    description:
                        "Faible impact — Bois issu de forêts gérées durablement, transport maritime optimisé, traitement sans solvant.",
                },
                description:
                    "Parquet massif en bambou pressé, une alternative écologique et esthétique au bois traditionnel. Extrêmement durable et facile d'entretien.",
                price: "45€/m²",
            },
        ],
    },
    {
        id: "3",
        name: "SolaireTech Innovation",
        image: "/companies/solairetech.jpg",
        description:
            "Innovation dans les technologies solaires et les systèmes de récupération d'énergie pour une construction autonome et respectueuse de l'environnement.",
        location: "Marseille, France",
        website: "www.solairetech.fr",
        email: "contact@solairetech.fr",
        phone: "+33 6 78 90 12 34",
        specialties: ["Solaire", "Stockage énergie", "Smart Grid"],
        subscription: "enterprise",
        products: [
            {
                id: "p6",
                name: "AquaRecup Pro",
                category: "Récupération d'Eau",
                characteristics: [
                    "Capacité: 5000L",
                    "Filtration 3 étapes",
                    "Pompe intégrée",
                    "Système connecté IoT",
                ],
                certification: {
                    name: "QB",
                    level: "B",
                    description:
                        "Faible impact — Réutilisation des eaux pluviales, réduction de la consommation d'eau potable, matériaux recyclés.",
                },
                description:
                    "Système complet de récupération et filtration des eaux pluviales pour usage domestique. Connecté et intelligent.",
                price: "3500€/système",
            },
            {
                id: "p7",
                name: "GreenRoof Living",
                category: "Toitures Végétalisées",
                characteristics: [
                    "Substrat drainant",
                    "Végétation sedum",
                    "Poids: 80kg/m²",
                    "Rétention eau: 60%",
                ],
                certification: {
                    name: "Effinature",
                    level: "A+",
                    description:
                        "Impact minimal — Biodiversité urbaine, isolation naturelle, rétention des eaux pluviales, capture CO2.",
                },
                description:
                    "Kit complet de toiture végétalisée extensive pour bâtiments plats et faible pente. Améliore l'isolation et la biodiversité urbaine.",
                price: "85€/m²",
            },
        ],
    },
    {
        id: "4",
        name: "BioConcept Habitat",
        image: "/companies/bioconcept.jpg",
        description:
            "Conception et fabrication de matériaux de construction biosourcés. Notre mission est de rendre la construction écologique accessible à tous.",
        location: "Bordeaux, France",
        website: "www.bioconcept.fr",
        email: "info@bioconcept.fr",
        phone: "+33 5 12 34 56 78",
        specialties: ["Chanvre", "Terre crue", "Paille"],
        subscription: "starter",
        products: [
            {
                id: "p8",
                name: "BioBloc Chanvre",
                category: "Matériaux de Construction",
                characteristics: [
                    "Chanvre + chaux",
                    "λ = 0.06 W/m·K",
                    "Régulateur hygrométrique",
                    "Stockage carbone négatif",
                ],
                certification: {
                    name: "FDES",
                    level: "A+",
                    description:
                        "Impact minimal — Matériau biosourcé à bilan carbone négatif, stocke plus de CO2 qu'il n'en émet sur son cycle de vie.",
                },
                description:
                    "Bloc de construction en béton de chanvre pour murs et cloisons. Excellent isolant thermique et acoustique avec un bilan carbone négatif.",
                price: "35€/m²",
            },
            {
                id: "p9",
                name: "LumiLED Smart",
                category: "Éclairage LED",
                characteristics: [
                    "4000K blanc neutre",
                    "25W (éq. 200W)",
                    "Durée de vie: 50000h",
                    "Gradable & connecté",
                ],
                certification: {
                    name: "Energy Star",
                    level: "A",
                    description:
                        "Très faible impact — Consommation réduite de 87%, sans mercure, durée de vie exceptionnelle.",
                },
                description:
                    "Luminaire LED intelligent pour bâtiments professionnels et résidentiels. Gestion automatique de l'éclairage selon la luminosité naturelle.",
                price: "120€/unité",
            },
        ],
    },
];

export const MOCK_PROJECTS: ProjectData[] = [
    {
        id: "proj1",
        personalInfo: {
            firstName: "Marie",
            lastName: "Dupont",
            email: "marie.dupont@email.com",
            phone: "+33 6 12 34 56 78",
            address: "12 Rue de la Paix, 75001 Paris",
        },
        specification: "Rénovation écologique d'une maison des années 70",
        location: "Paris 15ème, France",
        surface: 120,
        facadeDimensions: { width: 12, height: 8 },
        services: ["Recommandation de Pratiques", "Analyse Énergétique"],
        wwr: 25,
        status: "in_progress",
        createdAt: "2026-01-15",
    },
    {
        id: "proj2",
        personalInfo: {
            firstName: "Pierre",
            lastName: "Martin",
            email: "pierre.martin@email.com",
            phone: "+33 6 98 76 54 32",
            address: "45 Avenue des Champs, 69001 Lyon",
        },
        specification: "Construction d'un bâtiment passif pour bureaux",
        location: "Lyon 3ème, France",
        surface: 350,
        facadeDimensions: { width: 25, height: 12 },
        services: [
            "Simulation Thermique",
            "Certification HQE",
            "Bilan Carbone",
        ],
        wwr: 40,
        status: "completed",
        createdAt: "2025-11-20",
    },
];
