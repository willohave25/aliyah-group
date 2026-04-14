/**
 * ALIYAH GROUP - Gestion des formulaires
 * Double envoi : Supabase (stockage) + Formspree (notification email)
 */

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================
    var SUPABASE_URL = 'https://ilycnutphhmuvaonkrsa.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_1O960JacjvpleoB-jTqiag_7Ou-4Y0N';

    // Remplacer par votre ID Formspree après inscription sur formspree.io
    var FORMSPREE_CONTACT = 'https://formspree.io/f/xyklzojo';
    var FORMSPREE_DEVIS   = 'https://formspree.io/f/xyklzojo';

    var WA_PHONE = '33634028048';

    // Initialiser Supabase
    var sb = null;
    if (window.supabase) {
        sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }

    // ============================================
    // UTILITAIRES UI
    // ============================================

    function showMsg(container, type, text) {
        var existing = container.querySelector('.form-result-msg');
        if (existing) existing.remove();

        var el = document.createElement('div');
        el.className = 'form-result-msg form-result-' + type;
        el.innerHTML = text;
        container.appendChild(el);

        if (type === 'success') {
            setTimeout(function() { el.remove(); }, 8000);
        }
    }

    function setLoading(btn, loading) {
        if (loading) {
            btn.disabled = true;
            btn.dataset.original = btn.textContent;
            btn.textContent = 'Envoi en cours...';
        } else {
            btn.disabled = false;
            btn.textContent = btn.dataset.original || btn.textContent;
        }
    }

    // Envoyer vers Formspree (AJAX, pas de redirect)
    async function sendFormspree(url, form) {
        var resp = await fetch(url, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form)
        });
        return resp.ok;
    }


    // ============================================
    // FORMULAIRE CONTACT
    // ============================================
    var contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // Supprimer l'action HTML pour éviter le redirect
        contactForm.removeAttribute('action');

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            var btn = contactForm.querySelector('[type="submit"]');
            var container = contactForm.parentElement;
            setLoading(btn, true);

            var data = {
                nom:       contactForm.name.value.trim(),
                email:     contactForm.email.value.trim(),
                telephone: contactForm.phone ? contactForm.phone.value.trim() : '',
                service:   contactForm.service ? contactForm.service.value : '',
                objet:     contactForm.subject ? contactForm.subject.value.trim() : '',
                message:   contactForm.message.value.trim()
            };

            var supabaseOk = false;
            var formspreeOk = false;

            // 1. Sauvegarde Supabase
            try {
                if (sb) {
                    var result = await sb.from('aliyah_contacts').insert(data);
                    supabaseOk = !result.error;
                    if (result.error) console.warn('Supabase contact:', result.error.message);
                }
            } catch (err) {
                console.warn('Supabase erreur:', err);
            }

            // 2. Envoi Formspree (email)
            try {
                formspreeOk = await sendFormspree(FORMSPREE_CONTACT, contactForm);
            } catch (err) {
                console.warn('Formspree erreur:', err);
            }

            setLoading(btn, false);

            if (supabaseOk || formspreeOk) {
                contactForm.reset();
                showMsg(container, 'success',
                    '<strong>Message envoyé !</strong> Nous vous répondrons sous 24h ouvrées. Merci de nous avoir contactés.<br>' +
                    '<a href="https://wa.me/33634028048" target="_blank" rel="noopener" style="color:#25d366;font-weight:700;">💬 Réponse rapide sur WhatsApp</a>');
            } else {
                showMsg(container, 'error',
                    '<strong>Erreur d\'envoi.</strong> Contactez-nous directement : ' +
                    '<a href="https://wa.me/33634028048" target="_blank" rel="noopener" style="color:#25d366;">WhatsApp</a> ' +
                    'ou <a href="tel:+33634028048">+33 6 34 02 80 48</a>.');
            }
        });
    }

    // ============================================
    // FORMULAIRE DEVIS
    // ============================================
    var devisForm = document.getElementById('devisForm');

    if (devisForm) {
        devisForm.removeAttribute('action');

        // Affichage conditionnel des sections selon le service sélectionné
        var radios = devisForm.querySelectorAll('input[name="service"]');
        var sections = {
            'fret':              document.getElementById('fretDetails'),
            'btp':               document.getElementById('btpDetails'),
            'location-residence': document.getElementById('residenceDetails'),
            'location-vehicule': document.getElementById('vehiculeDetails'),
            'marketing-digital': document.getElementById('marketingDetails')
        };

        radios.forEach(function(radio) {
            radio.addEventListener('change', function() {
                Object.keys(sections).forEach(function(key) {
                    if (sections[key]) {
                        sections[key].style.display = (key === radio.value) ? 'block' : 'none';
                    }
                });
            });
        });

        devisForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            var btn = devisForm.querySelector('[type="submit"]');
            var container = devisForm.parentElement;
            setLoading(btn, true);

            // Récupérer le service sélectionné
            var serviceEl = devisForm.querySelector('input[name="service"]:checked');
            var service = serviceEl ? serviceEl.value : '';

            var data = {
                nom:      devisForm.nom ? devisForm.nom.value.trim() : '',
                prenom:   devisForm.prenom ? devisForm.prenom.value.trim() : '',
                email:    devisForm.email.value.trim(),
                telephone: devisForm.telephone.value.trim(),
                societe:  devisForm.societe ? devisForm.societe.value.trim() : '',
                service:  service,
                budget:   devisForm.budget ? devisForm.budget.value.trim() : '',
                message:  devisForm.message ? devisForm.message.value.trim() : '',
                statut:   'nouveau'
            };

            // Champs conditionnels selon service
            if (service === 'fret') {
                data.fret_type          = getValue(devisForm, 'fret_type');
                data.depart             = getValue(devisForm, 'depart');
                data.destination        = getValue(devisForm, 'destination');
                data.poids              = getNumber(devisForm, 'poids');
                data.volume             = getNumber(devisForm, 'volume');
                data.nature_marchandise = getValue(devisForm, 'nature_marchandise');
            } else if (service === 'btp') {
                data.btp_type           = getValue(devisForm, 'btp_type');
                data.localisation_projet = getValue(devisForm, 'localisation_projet');
                data.surface            = getNumber(devisForm, 'surface');
                data.delai_souhaite     = getValue(devisForm, 'delai_souhaite');
            } else if (service === 'location-residence') {
                data.date_debut_residence = getValue(devisForm, 'date_debut');
                data.duree_sejour         = getValue(devisForm, 'duree_sejour');
                data.nb_chambres          = getValue(devisForm, 'nb_chambres');
                data.nb_personnes         = getNumber(devisForm, 'nb_personnes');
                data.quartier_prefere     = getValue(devisForm, 'quartier_prefere');
            } else if (service === 'location-vehicule') {
                data.date_debut_vehicule = getValue(devisForm, 'date_debut_vehicule');
                data.date_fin_vehicule   = getValue(devisForm, 'date_fin_vehicule');
                data.type_vehicule       = getValue(devisForm, 'type_vehicule');
                var chauffeurEl = devisForm.querySelector('input[name="avec_chauffeur"]:checked');
                data.avec_chauffeur = chauffeurEl ? chauffeurEl.value : null;
            } else if (service === 'marketing-digital') {
                data.type_prestation   = getValue(devisForm, 'type_prestation');
                data.budget_mensuel    = getValue(devisForm, 'budget_mensuel');
                data.objectif_digital  = getValue(devisForm, 'objectif_digital');
            }

            var supabaseOk = false;
            var formspreeOk = false;

            // 1. Sauvegarde Supabase
            try {
                if (sb) {
                    var result = await sb.from('aliyah_devis').insert(data);
                    supabaseOk = !result.error;
                    if (result.error) console.warn('Supabase devis:', result.error.message);
                }
            } catch (err) {
                console.warn('Supabase erreur:', err);
            }

            // 2. Envoi Formspree (email)
            try {
                formspreeOk = await sendFormspree(FORMSPREE_DEVIS, devisForm);
            } catch (err) {
                console.warn('Formspree erreur:', err);
            }

            setLoading(btn, false);

            if (supabaseOk || formspreeOk) {
                devisForm.reset();
                Object.values(sections).forEach(function(s) {
                    if (s) s.style.display = 'none';
                });
                showMsg(container, 'success',
                    '<strong>Demande envoyée !</strong> Notre équipe vous contactera avec un devis personnalisé sous 24 à 48h ouvrées. Merci pour votre confiance.<br>' +
                    '<a href="https://wa.me/33634028048" target="_blank" rel="noopener" style="color:#25d366;font-weight:700;">💬 Suivre ma demande sur WhatsApp</a>');
            } else {
                showMsg(container, 'error',
                    '<strong>Erreur d\'envoi.</strong> Contactez-nous directement : ' +
                    '<a href="https://wa.me/33634028048" target="_blank" rel="noopener" style="color:#25d366;">WhatsApp</a> ' +
                    'ou <a href="tel:+33634028048">+33 6 34 02 80 48</a>.');
            }
        });
    }

    // ============================================
    // HELPERS
    // ============================================
    function getValue(form, name) {
        var el = form.elements[name];
        return el ? el.value.trim() : null;
    }

    function getNumber(form, name) {
        var el = form.elements[name];
        if (!el || el.value === '') return null;
        return parseFloat(el.value) || null;
    }

})();
