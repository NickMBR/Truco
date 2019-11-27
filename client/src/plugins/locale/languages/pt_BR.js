export default {
	app: {
		title: 'SmartDating',
		description: 'Encontros Pessoais',
		slogan: 'Meus Encontros Pessoais',
		sloganShort: 'Meus Encontros',
		madeBy: 'Feito por'
	},
	common: {
		yes: 'Sim',
		no: 'Não',
		next: 'Próximo',
		back: 'Voltar',
		type: 'Tipo',
		category: 'Categoria',
		categories: 'Categorias',
		upload: 'Importar',
		uploads: 'Importações',
		activities: 'Atividades',
		topActivities: 'Top de Atividades',
		moments: 'Momentos',
		topMoments: 'Top de Momentos',
		today: 'Hoje',
		emoji: 'Emoji',
		new: 'Nova',
		newO: 'Novo',
		contact: 'Contato',
		since: 'Desde',
		lastDates: 'Últimos Encontros',
		locals: 'Locais',
		address: 'Endereço',
		addresses: 'Endereços',
		place: 'Lugar',
		places: 'Lugares',
		topPlaces: 'Top de Lugares',
		until: 'Até',
		details: 'Detalhes',
		stats: 'Estatísticas'
	},
	menu: {
		home: 'Início',
		about: 'Sobre',
		exit: 'Sair',
		colors: 'Cores',
		tools: 'Ferramentas',
		settings: 'Configurações',
		calendar: 'Calendário',
		date: 'Encontro',
		dates: 'Encontros',
		people: 'Pessoas'
	},
	message: {
		welcome: 'Bem Vindo!'
	},
	actions: {
		start: 'Começar',
		delete: 'Deletar',
		remove: 'Remover',
		save: 'Salvar',
		cancel: 'Cancelar',
		edit: 'Editar',
		search: 'Pesquisar'
	},
	forms: {
		name: 'Nome',
		email: 'Email',
		password: 'Senha',
		confirmPassword: 'Confirme a senha',
		remember: 'Lembrar credenciais?',
		login: 'Entrar',
		register: 'Registrar',
		newRecord: 'Novo Registro',
		language: 'Idioma',
		theme: 'Tema',
		darkMode: 'Modo Escuro',
		whenMeet: 'Quando você conheceu',
		whenDate: 'Quando vocês se encontraram?',
		hourDate: 'Qual foi a duração do encontro?',
		selectImage: 'Selecione uma imagem',
		selectIcon: 'Selecione um ícone'
	},
	time: {
		day: 'Dia',
		days: 'Dias',
		hour: 'Hora',
		hours: 'Horas',
		minute: 'Minuto',
		minutes: 'Minutos',
		to: 'até',
		and: 'e'
	},
	setup: {
		title: 'Olá, bem vindo ao',
		letsStart: 'Vamos começar?',
		defineCredentials: 'Defina sua conta de acesso',
		signUp: 'Registrar-se'
	},
	themes: {
		default: 'Padrão',
		dark: 'Escuro',
		forest: 'Floresta',
		love: 'Amor'
	},
	validations: {
		required: 'Esse campo é obrigatório.',
		invalid: 'Esse campo está inválido.',
		invalids: 'Os campos estão vazios ou inválidos.',
		match: 'Os campos não são iguais.',
		alpha: 'O campo deve conter somente ter letras.',
		numeric: 'O campo deve conter somente ter números.',
		length: 'The field must contain at least ¬ characters.',
		noChanges: 'Nenhuma alteração foi feita',
		exists: 'Esse registro já existe.',
		date: 'Esse campo deve conter uma data válida.'
	},
	errors: {
		pages: {
			P403: 'Acesso Negado',
			P404: 'Rota Indefinida'
		}
	},
	alerts: {
		user: {
			logout: 'Tem certeza que deseja sair?'
		},
		entries: {
			cancel: 'Há dados não salvos, tem certeza que deseja cancelar?',
			removal: 'Tem certeza que deseja remover esse registro?'
		}
	},
	$vuetify: {
		close: 'Fechar',
		dataIterator: {
			pageText: '{0}-{1} de {2}',
			noResultsText: 'Nenhum registro encontrado',
			loadingText: 'Carregando itens...'
		},
		dataTable: {
			itemsPerPageText: 'Itens por página:',
			ariaLabel: {
				sortDescending: ': Em ordem decrescente. Ative para remover ordenação.',
				sortAscending: ': Em ordem crescente. Ative para ordernar em ordem decrescente.',
				sortNone: ': Não ordenado. Ative para ordernar em ordem crescente.'
			}
		},
		dataFooter: {
			itemsPerPageText: 'Itens por página:',
			itemsPerPageAll: 'Todos',
			nextPage: 'Próxima',
			prevPage: 'Anterior',
			firstPage: 'Primeira página',
			lastPage: 'Última página'
		},
		datePicker: {
			itemsSelected: '{0} selecionado'
		},
		noDataText: 'Nenhum registro encontrado',
		carousel: {
			prev: 'Anterior',
			next: 'Próximo'
		},
		calendar: {
			moreEvents: '{0} mais'
		}
	}
}
