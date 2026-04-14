/**
 * ALIYAH GROUP - Actualités
 * Chargement dynamique via Supabase
 */

// Configuration Supabase
const SUPABASE_URL = 'https://ilycnutphhmuvaonkrsa.supabase.co';
const SUPABASE_KEY = 'sb_publishable_1O960JacjvpleoB-jTqiag_7Ou-4Y0N';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Charger et afficher les actualités
async function loadActualites() {
    const container = document.getElementById('actualites-container');
    if (!container) return;

    try {
        const { data, error } = await supabase
            .from('actualites')
            .select('*')
            .order('date_publication', { ascending: false })
            .limit(20);

        if (error) throw error;

        container.innerHTML = '';

        if (!data || data.length === 0) {
            container.innerHTML = '<p class="no-actualites">Aucune actualité pour le moment.</p>';
            return;
        }

        data.forEach(function(actualite) {
            const card = createActualiteCard(actualite);
            container.appendChild(card);
        });

    } catch (error) {
        console.error('Erreur chargement actualités:', error);
        container.innerHTML = '<p class="no-actualites">Erreur lors du chargement des actualités.</p>';
    }
}

// Créer une carte d'actualité
function createActualiteCard(actualite) {
    const card = document.createElement('div');
    card.className = 'actualite-card';

    const date = new Date(actualite.date_publication);
    const dateFormatted = date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    let mediaHTML = '';
    if (actualite.photo_url) {
        mediaHTML = '<img src="' + actualite.photo_url + '" alt="' + actualite.titre + '" class="actualite-image" loading="lazy">';
    } else if (actualite.video_url) {
        mediaHTML = '<video src="' + actualite.video_url + '" controls class="actualite-video"></video>';
    }

    card.innerHTML =
        mediaHTML +
        '<div class="actualite-content">' +
            '<span class="actualite-type">' + (actualite.type || 'Actualité') + '</span>' +
            '<h3 class="actualite-title">' + actualite.titre + '</h3>' +
            '<p class="actualite-description">' + actualite.description + '</p>' +
            '<div class="actualite-footer">' +
                '<span class="actualite-date">' + dateFormatted + '</span>' +
            '</div>' +
        '</div>';

    return card;
}

// Lancer au chargement
if (document.getElementById('actualites-container')) {
    loadActualites();
}
