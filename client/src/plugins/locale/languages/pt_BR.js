export default {
	app: {
		title: 'Truco',
		madeBy: 'Feito por',
		seeOnGithub: 'Veja no Github'
	},
	common: {
		yes: 'Sim',
		no: 'Não',
		ok: 'Ok',
		next: 'Próximo',
		back: 'Voltar',
		type: 'Tipo',
		category: 'Categoria',
		categories: 'Categorias',
		upload: 'Importar',
		uploads: 'Importações',
		today: 'Hoje',
		emoji: 'Emoji',
		new: 'Nova',
		newO: 'Novo',
		contact: 'Contato',
		since: 'Desde',
		until: 'Até',
		details: 'Detalhes',
		stats: 'Estatísticas',
		nice: 'Boa!',
		history: 'Histórico',
		point: 'Ponto',
		points: 'Pontos',
		score: 'Placar',
		scored: 'Ganhou',
		table: 'Tabela',
		wins: 'Vitórias',
		losses: 'Derrotas',
		winLossRatio: 'V/D',
		name: 'Nome',
		rank: 'Pos.'
	},
	game: {
		teamA: 'Nós',
		teamB: 'Eles',
		changedName: 'Trocou o nome para',
		runningMatchs: 'Partidas em Andamento',
		previousMatchs: 'Partidas Anteriores'
	},
	menu: {
		home: 'Início',
		play: 'Jogar',
		about: 'Sobre',
		exit: 'Sair',
		tools: 'Ferramentas',
		settings: 'Configurações',
		matchs: 'Partidas',
		teams: 'Times',
		ranking: 'Classificação'
	},
	actions: {
		start: 'Começar',
		delete: 'Deletar',
		remove: 'Remover',
		save: 'Salvar',
		cancel: 'Cancelar',
		edit: 'Editar',
		search: 'Pesquisar',
		confirm: 'Confirmar',
		undo: 'Desfazer'
	},
	forms: {
		language: 'Idioma',
		theme: 'Tema',
		darkMode: 'Modo Escuro',
		showMatchHistory: 'Mostrar Histórico da Partida',
		keepTeamNames: 'Mantes Nome dos Times',
		teamName: 'Nome do Time'
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
	themes: {
		default: 'Padrão',
		dark: 'Escuro',
		forest: 'Floresta',
		wine: 'Vinho',
		orchid: 'Orquídea'
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
		},
		content: {
			noTeams: 'Não há times para mostrar.'
		}
	},
	alerts: {
		game: {
			save: 'Tem certeza que deseja salvar essa partida?',
			reset: 'Tem certeza que deseja resetar essa partida?',
			winner: '§ venceu a partida!'
		}
	},
	$vuetify: {
		badge: 'Distintivo',
		close: 'Fechar',
		dataIterator: {
			noResultsText: 'Nenhum registro encontrado',
			loadingText: 'Carregando itens...'
		},
		dataTable: {
			itemsPerPageText: 'Itens por página:',
			ariaLabel: {
				sortDescending: 'Em ordem decrescente.',
				sortAscending: 'Em ordem crescente.',
				sortNone: 'Não ordenado.',
				activateNone: 'Ative para remover ordenação.',
				activateDescending: 'Ative para ordernar em ordem decrescente.',
				activateAscending: 'Ative para ordernar em ordem crescente.'
			},
			sortBy: 'Ordernar por'
		},
		dataFooter: {
			itemsPerPageText: 'Itens por página:',
			itemsPerPageAll: 'Todos',
			nextPage: 'Próxima',
			prevPage: 'Anterior',
			firstPage: 'Primeira página',
			lastPage: 'Última página',
			pageText: '{0}-{1} de {2}'
		},
		datePicker: {
			itemsSelected: '{0} selecionado'
		},
		noDataText: 'Nenhum registro encontrado',
		carousel: {
			prev: 'Anterior',
			next: 'Próximo',
			ariaLabel: {
				delimiter: 'Slide {0} of {1}'
			}
		},
		calendar: {
			moreEvents: '{0} mais'
		},
		fileInput: {
			counter: '{0} arquivos',
			counterSize: '{0} arquivos ({1} no total)'
		},
		timePicker: {
			am: 'AM',
			pm: 'PM'
		}
	}
}
