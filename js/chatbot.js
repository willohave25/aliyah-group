/**
 * ALIYAH GROUP - W2K Assistant Chatbot
 * FAQ interactif par catégories
 */

(function() {
    'use strict';

    // ============================================
    // DONNÉES FAQ
    // ============================================
    var FAQ = {
        'Fret Aérien & Maritime': [
            {
                q: 'Quels sont les délais de livraison ?',
                r: 'Voie aérienne : <strong>3 à 4 jours</strong> Paris → Abidjan. Voie maritime : <strong>3 à 4 semaines</strong> selon le prochain container disponible.'
            },
            {
                q: 'Quels types de marchandises acceptez-vous ?',
                r: 'Colis personnels, vêtements, électronique, alimentaire non périssable, matériaux de construction, équipements professionnels, etc. Nous vous conseillons sur les restrictions douanières.'
            },
            {
                q: 'Le dédouanement est-il inclus ?',
                r: 'Oui, ALIYAH COLISEXPRESS gère <strong>toutes les formalités douanières</strong> de A à Z, aussi bien en France qu\'en Côte d\'Ivoire.'
            },
            {
                q: 'Comment suivre mon colis ?',
                r: 'Nous vous communiquons un numéro de suivi à chaque expédition. Pour toute information en temps réel, contactez-nous directement par téléphone ou email.'
            },
            {
                q: 'Comment calculer le tarif de mon envoi ?',
                r: 'Le tarif est calculé selon le <strong>poids et le volume</strong> de votre envoi. Demandez un devis gratuit via notre formulaire ou appelez-nous — réponse sous 24h.'
            }
        ],
        'BTP & Construction': [
            {
                q: 'Dans quelles zones intervenez-vous ?',
                r: 'ALIYAH BTP intervient à <strong>Abidjan et dans toute la Côte d\'Ivoire</strong> : Treichville, Plateau, Cocody, Marcory, et l\'intérieur du pays.'
            },
            {
                q: 'Les devis sont-ils gratuits ?',
                r: 'Oui, <strong>devis entièrement gratuit</strong> sous 48h après étude de votre projet. Remplissez notre formulaire en ligne ou contactez-nous directement.'
            },
            {
                q: 'Quels types de projets réalisez-vous ?',
                r: 'Construction <strong>résidentielle</strong> (villas, immeubles), <strong>commerciale</strong> (bureaux, hôtels), <strong>travaux publics</strong> (routes, voiries) et <strong>rénovation</strong> complète.'
            },
            {
                q: 'Quels matériaux utilisez-vous ?',
                r: 'Uniquement des matériaux certifiés, conformes aux <strong>normes ivoiriennes et internationales</strong>. Qualité contrôlée à chaque étape du chantier.'
            },
            {
                q: 'Comment se déroule un projet de construction ?',
                r: 'En 6 étapes : consultation, conception des plans, devis détaillé, réalisation, contrôle qualité et livraison avec SAV. Suivi régulier tout au long du projet.'
            }
        ],
        'Location Résidences & Véhicules': [
            {
                q: 'Quels véhicules proposez-vous à la location ?',
                r: '<strong>Berlines</strong> (ville), <strong>SUV/4x4</strong> (tout-terrain), <strong>minibus</strong> (groupes), et <strong>utilitaires</strong>. Disponibles avec ou sans chauffeur.'
            },
            {
                q: 'Les résidences sont-elles entièrement équipées ?',
                r: 'Oui, toutes nos résidences sont <strong>meublées et équipées</strong> : TV, WiFi haut débit, électroménager complet, climatisation, parking sécurisé, gardiennage 24h/24.'
            },
            {
                q: 'Proposez-vous la location longue durée ?',
                r: 'Oui, nous proposons aussi bien la <strong>courte durée</strong> (quelques jours) que la <strong>longue durée</strong> pour résidences et véhicules. Tarifs dégressifs.'
            },
            {
                q: 'Où sont situées vos résidences ?',
                r: 'Dans les quartiers prisés d\'Abidjan : <strong>Treichville, Marcory, Cocody, Assinie</strong>. Proches des commerces, hôpitaux et centres d\'affaires.'
            },
            {
                q: 'Faut-il un permis pour louer un véhicule ?',
                r: 'Pour la location <strong>sans chauffeur</strong>, un permis de conduire valide est requis. Pour la location <strong>avec chauffeur</strong>, aucun document supplémentaire n\'est nécessaire.'
            }
        ],
        'Marketing Digital': [
            {
                q: 'Combien coûte la création d\'un site web ?',
                r: '<strong>Site vitrine :</strong> à partir de 500 000 FCFA. <strong>Site e-commerce :</strong> à partir de 1 500 000 FCFA. <strong>Application métier :</strong> sur devis. Devis gratuit sous 48h.'
            },
            {
                q: 'Combien de temps faut-il pour créer un site ?',
                r: '<strong>Site vitrine :</strong> 2 à 3 semaines. <strong>Site e-commerce :</strong> 4 à 6 semaines. <strong>Application mobile :</strong> selon la complexité. Délais définis contractuellement.'
            },
            {
                q: 'Proposez-vous la gestion des réseaux sociaux ?',
                r: 'Oui, gestion complète : création de contenu, publication régulière, campagnes publicitaires (Facebook Ads, Google Ads), et rapports mensuels de performance.'
            },
            {
                q: 'Gérez-vous la maintenance après livraison ?',
                r: 'Oui, <strong>support technique 7j/7</strong>, mises à jour régulières, sauvegardes quotidiennes et monitoring de performance. Contrats de maintenance disponibles.'
            },
            {
                q: 'Intégrez-vous le paiement Mobile Money ?',
                r: 'Oui, nos sites e-commerce intègrent nativement <strong>Orange Money, MTN Mobile Money et Moov Money</strong>, les solutions de paiement les plus utilisées en Côte d\'Ivoire.'
            }
        ],
        'Contact & Informations': [
            {
                q: 'Où sont vos bureaux ?',
                r: '<strong>Abidjan :</strong> Rue 21, Avenue 13 Lot 199, Treichville, Abidjan 225.<br><strong>Paris :</strong> 8 avenue Francis de Pressencé, 93300 Aubervilliers.'
            },
            {
                q: 'Quels sont vos horaires d\'ouverture ?',
                r: '<strong>Abidjan :</strong> Lundi–Vendredi 8h–18h, Samedi 9h–13h.<br><strong>Paris :</strong> Lundi–Vendredi 9h–18h.'
            },
            {
                q: 'Comment obtenir un devis rapidement ?',
                r: 'Remplissez le formulaire de devis sur notre site — réponse sous <strong>24 à 48h</strong>. Ou appelez-nous directement pour une réponse immédiate.'
            },
            {
                q: 'Travaillez-vous avec les entreprises ?',
                r: 'Oui, nous accompagnons <strong>particuliers et entreprises</strong>, en France et en Côte d\'Ivoire. Contrats entreprises et facturation disponibles.'
            },
            {
                q: 'Peut-on vous contacter depuis la France ?',
                r: 'Bien sûr ! Appelez le <strong>+33 6 34 02 80 48</strong> ou écrivez à <strong>contact@aliyah-group.com</strong>. Nous répondons dans les plus brefs délais.'
            }
        ]
    };

    var CONTACT = {
        tel_fr: '+33 6 34 02 80 48',
        tel_ci: '+225 07 99 65 95 21',
        email: 'contact@aliyah-group.com'
    };

    // ============================================
    // INJECTION CSS
    // ============================================
    var css = `
        /* Chatbot W2K Assistant */
        #wk2-chat-btn {
            position: fixed;
            bottom: 30px;
            left: 30px;
            width: 60px;
            height: 60px;
            background: #2d7a3e;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(45,122,62,0.45);
            z-index: 9998;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        #wk2-chat-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 24px rgba(45,122,62,0.55);
        }
        #wk2-chat-btn svg {
            width: 28px;
            height: 28px;
            fill: white;
        }
        #wk2-chat-btn .chat-notif {
            position: absolute;
            top: 2px;
            right: 2px;
            width: 14px;
            height: 14px;
            background: #e53e3e;
            border-radius: 50%;
            border: 2px solid white;
        }
        #wk2-chat-window {
            position: fixed;
            bottom: 100px;
            left: 30px;
            width: 360px;
            max-height: 560px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 8px 40px rgba(0,0,0,0.18);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform: scale(0.95) translateY(10px);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.25s, transform 0.25s;
        }
        #wk2-chat-window.open {
            transform: scale(1) translateY(0);
            opacity: 1;
            pointer-events: all;
        }
        .wk2-header {
            background: linear-gradient(135deg, #2d7a3e, #1f5a2d);
            padding: 16px 18px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .wk2-avatar {
            width: 42px;
            height: 42px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            flex-shrink: 0;
        }
        .wk2-header-info h4 {
            color: white;
            font-size: 0.95rem;
            font-weight: 700;
            margin: 0;
        }
        .wk2-header-info p {
            color: rgba(255,255,255,0.8);
            font-size: 0.78rem;
            margin: 2px 0 0 0;
        }
        .wk2-close {
            margin-left: auto;
            background: none;
            border: none;
            color: white;
            font-size: 22px;
            cursor: pointer;
            line-height: 1;
            padding: 2px 6px;
            border-radius: 4px;
            transition: background 0.15s;
        }
        .wk2-close:hover {
            background: rgba(255,255,255,0.2);
        }
        .wk2-body {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-height: 380px;
        }
        .wk2-body::-webkit-scrollbar { width: 4px; }
        .wk2-body::-webkit-scrollbar-track { background: #f1f1f1; }
        .wk2-body::-webkit-scrollbar-thumb { background: #ccc; border-radius: 2px; }
        .wk2-msg {
            max-width: 88%;
            padding: 10px 14px;
            border-radius: 14px;
            font-size: 0.88rem;
            line-height: 1.5;
        }
        .wk2-msg.bot {
            background: #f0f7f2;
            color: #2d3748;
            border-bottom-left-radius: 4px;
            align-self: flex-start;
        }
        .wk2-msg.user {
            background: #2d7a3e;
            color: white;
            border-bottom-right-radius: 4px;
            align-self: flex-end;
        }
        .wk2-categories {
            display: flex;
            flex-direction: column;
            gap: 7px;
            align-self: flex-start;
            width: 100%;
        }
        .wk2-cat-btn {
            background: white;
            border: 1.5px solid #2d7a3e;
            color: #2d7a3e;
            padding: 9px 14px;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            text-align: left;
            transition: all 0.18s;
        }
        .wk2-cat-btn:hover {
            background: #2d7a3e;
            color: white;
        }
        .wk2-faqs {
            display: flex;
            flex-direction: column;
            gap: 6px;
            align-self: flex-start;
            width: 100%;
        }
        .wk2-faq-btn {
            background: #f8f8f8;
            border: 1px solid #e0e0e0;
            color: #333;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 0.83rem;
            cursor: pointer;
            text-align: left;
            transition: all 0.15s;
            line-height: 1.4;
        }
        .wk2-faq-btn:hover {
            background: #e8f5e9;
            border-color: #2d7a3e;
            color: #2d7a3e;
        }
        .wk2-back-btn {
            background: none;
            border: none;
            color: #2d7a3e;
            font-size: 0.83rem;
            cursor: pointer;
            padding: 4px 0;
            text-decoration: underline;
            align-self: flex-start;
        }
        .wk2-footer {
            background: #f9f9f9;
            border-top: 1px solid #eee;
            padding: 12px 16px;
        }
        .wk2-contact-bar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            justify-content: center;
        }
        .wk2-contact-bar a {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.78rem;
            font-weight: 600;
            color: #2d7a3e;
            text-decoration: none;
            background: white;
            border: 1px solid #c6e6cc;
            border-radius: 20px;
            padding: 5px 12px;
            transition: background 0.15s;
        }
        .wk2-contact-bar a:hover {
            background: #e8f5e9;
        }
        @media (max-width: 420px) {
            #wk2-chat-window {
                width: calc(100vw - 24px);
                left: 12px;
                right: 12px;
            }
            #wk2-chat-btn {
                left: 20px;
                bottom: 20px;
            }
        }
    `;

    var styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // ============================================
    // INJECTION HTML
    // ============================================
    var html = `
        <button id="wk2-chat-btn" aria-label="Ouvrir le chat">
            <div class="chat-notif"></div>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
        </button>

        <div id="wk2-chat-window" role="dialog" aria-label="W2K Assistant">
            <div class="wk2-header">
                <div class="wk2-avatar">🤖</div>
                <div class="wk2-header-info">
                    <h4>W2K Assistant</h4>
                    <p>ALIYAH GROUP · En ligne</p>
                </div>
                <button class="wk2-close" id="wk2-close-btn" aria-label="Fermer">×</button>
            </div>

            <div class="wk2-body" id="wk2-body"></div>

            <div class="wk2-footer">
                <div class="wk2-contact-bar">
                    <a href="tel:+33634028048">📞 +33 6 34 02 80 48</a>
                    <a href="mailto:contact@aliyah-group.com">✉ contact@aliyah-group.com</a>
                </div>
            </div>
        </div>
    `;

    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    // ============================================
    // LOGIQUE DU CHATBOT
    // ============================================
    var btn      = document.getElementById('wk2-chat-btn');
    var win      = document.getElementById('wk2-chat-window');
    var closeBtn = document.getElementById('wk2-close-btn');
    var body     = document.getElementById('wk2-body');
    var notif    = btn.querySelector('.chat-notif');

    var isOpen = false;

    // Ouvrir / fermer
    btn.addEventListener('click', function() {
        isOpen = !isOpen;
        win.classList.toggle('open', isOpen);
        if (isOpen) {
            notif.style.display = 'none';
            if (body.children.length === 0) showWelcome();
        }
    });

    closeBtn.addEventListener('click', function() {
        isOpen = false;
        win.classList.remove('open');
    });

    // Ajouter un message bot
    function addBotMsg(content) {
        var m = document.createElement('div');
        m.className = 'wk2-msg bot';
        m.innerHTML = content;
        body.appendChild(m);
        scrollBottom();
    }

    // Ajouter un message utilisateur
    function addUserMsg(text) {
        var m = document.createElement('div');
        m.className = 'wk2-msg user';
        m.textContent = text;
        body.appendChild(m);
        scrollBottom();
    }

    // Scroll en bas
    function scrollBottom() {
        setTimeout(function() {
            body.scrollTop = body.scrollHeight;
        }, 60);
    }

    // Afficher l'accueil
    function showWelcome() {
        addBotMsg('Bonjour ! Je suis le <strong>W2K Assistant</strong> d\'ALIYAH GROUP. Comment puis-je vous aider ?');
        setTimeout(function() {
            addBotMsg('Choisissez une catégorie :');
            showCategories();
        }, 400);
    }

    // Afficher les catégories
    function showCategories() {
        var div = document.createElement('div');
        div.className = 'wk2-categories';

        Object.keys(FAQ).forEach(function(cat) {
            var b = document.createElement('button');
            b.className = 'wk2-cat-btn';
            b.textContent = cat;
            b.addEventListener('click', function() {
                addUserMsg(cat);
                setTimeout(function() { showFAQs(cat); }, 250);
            });
            div.appendChild(b);
        });

        body.appendChild(div);
        scrollBottom();
    }

    // Afficher les FAQ d'une catégorie
    function showFAQs(cat) {
        addBotMsg('Voici les questions fréquentes sur <strong>' + cat + '</strong> :');

        var div = document.createElement('div');
        div.className = 'wk2-faqs';

        FAQ[cat].forEach(function(item) {
            var b = document.createElement('button');
            b.className = 'wk2-faq-btn';
            b.textContent = item.q;
            b.addEventListener('click', function() {
                addUserMsg(item.q);
                setTimeout(function() {
                    addBotMsg(item.r);
                    setTimeout(function() {
                        addBotMsg('Une autre question ?');
                        showBackBtn(cat);
                    }, 400);
                }, 250);
            });
            div.appendChild(b);
        });

        // Bouton retour
        var back = document.createElement('button');
        back.className = 'wk2-back-btn';
        back.textContent = '← Retour aux catégories';
        back.addEventListener('click', function() {
            addBotMsg('Quelle autre catégorie vous intéresse ?');
            setTimeout(showCategories, 250);
        });
        div.appendChild(back);

        body.appendChild(div);
        scrollBottom();
    }

    // Boutons après réponse
    function showBackBtn(cat) {
        var div = document.createElement('div');
        div.className = 'wk2-faqs';

        var b1 = document.createElement('button');
        b1.className = 'wk2-faq-btn';
        b1.textContent = 'Autre question sur ' + cat;
        b1.addEventListener('click', function() {
            addUserMsg('Autre question sur ' + cat);
            setTimeout(function() { showFAQs(cat); }, 250);
        });

        var b2 = document.createElement('button');
        b2.className = 'wk2-faq-btn';
        b2.textContent = 'Voir d\'autres catégories';
        b2.addEventListener('click', function() {
            addUserMsg('Voir d\'autres catégories');
            setTimeout(function() {
                addBotMsg('Choisissez une catégorie :');
                setTimeout(showCategories, 200);
            }, 250);
        });

        div.appendChild(b1);
        div.appendChild(b2);
        body.appendChild(div);
        scrollBottom();
    }

    // Notification initiale après 3s
    setTimeout(function() {
        if (!isOpen) notif.style.display = 'block';
    }, 3000);

})();
