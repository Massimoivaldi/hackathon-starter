const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const organizzazioneSchema = new mongoose.Schema({
  nome : String,
  img: String,
  icon: String,
  excerpt: String,
  description: String,
  corso: [{_idcorso:Schema.Types.ObjectId, titolo:String,img:String,excerpt:String}],
  categoria: [{_idcategoria:Schema.Types.ObjectId, nome:String,img:String,excerpt:String}],
  docente: [{_iddocente:Schema.Types.ObjectId, nomecognome:String,img:String,excerpt:String}]
}, { timestamps: true });


const Organizzazione = mongoose.model('Organizzazione', organizzazioneSchema);

module.exports = Organizzazione;

/*
Corso
{
	"_id": "...",
	"categoria" : {"_categoriaid":object,"nome":"Informatica","icon":"url","picture":"url","excerpt":"short blablabla"},
	"titolo" : "Una bella storia",
	"organizzazione" : "Web Accademy",
	"docenti" : ["Pippo","Pluto"],
	"excerpt" : "short bla bla bla",
	"description" : "long bla bla bla",
	"begin": datetime,
	"durata": number of weeks,
	"lezioni_di_ore": number,
	"certificato" : true,
	"img": "url",
	"video": "url"
}

Categoria
{
	"_id": "...",
	"nome" : "Informatica",
	"icon" : "url",
	"picture" : "url",
	"excerpt" : "small text",
	"description" : "long text"
	"corsi" : [{"_idcorso": object,
				"titolo":"primo_corso",
				"img":"url",
				"excerpt":""
				},
				{"_idcorso": object,
				"titolo":"primo_corso",
				"img":"url",
				"excerpt":""
				}
				],
	"docenti": [{"_iddocente": object,
				"nomecognome":"pippo",
				"img":"url",
				"excerpt":""
				},
				{"_iddocente": object,
				"nomecognome":"primo_corso",
				"img":"url",
				"excerpt":""
				}
				],
	"organizzazioni": [{"_idorg": object,
				"nome":"pippo",
				"ico":"url",
				"img":"url",
				"excerpt":""
				}
				]
}

Docente 
{
	"_id": "...",
	"nomecognome": "Pippofranco",
	"img" : "url",
	"excerpt": "bla bla",
	"description" : ""
}

Organizzazione 
{
	"_id": "...",
	"nome": "Pippofranco",
	"img" : "url",
	"ico" : "url",
	"excerpt": "bla bla",
	"description" : "bla bla bla bla"
}


*/
