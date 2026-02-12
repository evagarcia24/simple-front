const API_BASE = 'http://localhost:8084/api';

const api = {
    async request(method, path, body) {
        const opts = {
            method,
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        };
        if (body) opts.body = JSON.stringify(body);
        const res = await fetch(API_BASE + path, opts);
        const text = await res.text();
        let data;
        try { data = JSON.parse(text); } catch { data = text; }
        if (!res.ok) throw { status: res.status, message: data };
        return data;
    },

    // Auth
    login(username, password) { return this.request('POST', '/auth/login', { username, password }); },
    register(name, email, password) { return this.request('POST', '/auth/register', { name, email, password }); },
    logout() { return this.request('POST', '/auth/logout'); },
    me() { return this.request('GET', '/auth/me'); },

    // Users
    getUsers() { return this.request('GET', '/users'); },
    deleteUser(id) { return this.request('DELETE', '/users/' + id); },

    // Hero Races (system-defined)
    getHeroRaces() { return this.request('GET', '/hero-races'); },

    // User Races
    getUserRaces() { return this.request('GET', '/user-races'); },

    // System Heroes
    getSystemHeroes() { return this.request('GET', '/character-system-heroes'); },

    // User Heroes
    getUserHeroes(userId) {
        const q = userId ? '?userId=' + userId : '';
        return this.request('GET', '/character-user-heroes' + q);
    },
    createUserHero(raceId, name) { return this.request('POST', '/character-user-heroes', { raceId, name }); },
    deleteUserHero(id) { return this.request('DELETE', '/character-user-heroes/' + id); },

    // Packs
    getPacks() { return this.request('GET', '/packs'); },

    // Rosters
    createRoster(systemHeroIds, userHeroIds) {
        return this.request('POST', '/character-rosters', {
            characterSystemHeroIds: systemHeroIds,
            characterUserHeroIds: userHeroIds
        });
    },

    // Game Definitions
    createGameDefinition(packId, systemHeroIds, userHeroIds) {
        return this.request('POST', '/game-definitions', {
            packId, characterSystemHeroIds: systemHeroIds, characterUserHeroIds: userHeroIds
        });
    },

    // Game Runs
    createGameRun(gameDefinitionId) { return this.request('POST', '/game-runs', { gameDefinitionId }); },
    getGameRun(id) { return this.request('GET', '/game-runs/' + id); },
    getCurrentEncounter(id) { return this.request('GET', '/game-runs/' + id + '/current-encounter'); },
    resolveEncounterInteract(id) { return this.request('POST', '/game-runs/' + id + '/resolve-encounter-interact'); },
    resolveEncounterAvoid(id) { return this.request('POST', '/game-runs/' + id + '/resolve-encounter-avoid'); },
    rollClashInitiative(id) { return this.request('POST', '/game-runs/' + id + '/roll-clash-initiative'); },
    resolveClashRound(id) { return this.request('POST', '/game-runs/' + id + '/resolve-clash-round'); },
    advanceAfterClash(id) { return this.request('POST', '/game-runs/' + id + '/advance-after-clash'); },
    usePotion(id, heroSlot, potionId) {
        return this.request('POST', '/game-runs/' + id + '/use-potion', { heroSlot, potionId });
    },

    // Weapons, Shields, Potions
    getWeapons() { return this.request('GET', '/weapons'); },
    getShields() { return this.request('GET', '/shields'); },
    getPotions() { return this.request('GET', '/potions'); },

    // Stories
    getStories() { return this.request('GET', '/stories'); },

    // Encounters
    getEncounters() { return this.request('GET', '/encounters'); },
};
