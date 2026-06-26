/**
 * NPC (Non-Player Character) System
 */
class NPCSystem {
    constructor(scene) {
        this.scene = scene;
        this.npcs = [];
        this.initializeNPCs();
    }

    initializeNPCs() {
        this.npcTypes = {
            ringmaster: { name: 'The Ringmaster', role: 'Leader', dialogue: ['Welcome to my spectacle!', 'Have you seen the acrobats?', 'The circus never ends!'], color: 0xff6347, quests: ['find_acrobats'] },
            acrobat: { name: 'The Acrobat', role: 'Performer', dialogue: ['Watch me flip!', 'The trapeze calls!', 'Care to see my routine?'], color: 0x00ff7f, quests: ['trapeze_trial'] },
            clown: { name: 'The Jester', role: 'Entertainer', dialogue: ['*honks nose*', 'Why did the clown go to school?', 'Want to hear a joke?'], color: 0xffa500, quests: ['solve_riddles'] },
            fortune_teller: { name: 'Madame Mystique', role: 'Seer', dialogue: ['I see your future!', 'The cards reveal all.', 'Your destiny lies here.'], color: 0x9370db, quests: ['seek_destiny'] },
            strongman: { name: 'The Colossus', role: 'Strongman', dialogue: ['Feel my muscles!', 'I can lift anything!', 'Want a demonstration?'], color: 0x8b0000, quests: ['lift_challenge'] },
            fire_eater: { name: 'Flame Dancer', role: 'Performer', dialogue: ['Fire bends to me!', 'Watch this!', 'Danger is my middle name!'], color: 0xff4500, quests: ['fire_trial'] },
            animal_trainer: { name: 'The Lion Keeper', role: 'Trainer', dialogue: ['The lions respect me.', 'Want to meet them?', 'Animals are my passion.'], color: 0xdaa520, quests: ['tame_lions'] },
            musician: { name: 'The Harmonist', role: 'Musician', dialogue: ['Music flows through me!', 'Listen to this melody!', 'The circus is a symphony!'], color: 0x1e90ff, quests: ['collect_instruments'] }
        };
    }

    createNPC(type, position) {
        if (!this.npcTypes[type]) return null;
        const npcType = this.npcTypes[type];
        const mesh = this.createNPCMesh(npcType.color);
        mesh.position.set(position.x, position.y, position.z);
        this.scene.add(mesh);
        const npc = { type, name: npcType.name, role: npcType.role, mesh, position, dialogue: npcType.dialogue, quests: npcType.quests, interacted: false };
        this.npcs.push(npc);
        return npc;
    }

    createNPCMesh(color) {
        const group = new THREE.Group();
        const bodyGeometry = new THREE.CapsuleGeometry(0.3, 1.5, 4, 8);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.castShadow = true;
        group.add(body);
        const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
        const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffdbac });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.0;
        head.castShadow = true;
        group.add(head);
        return group;
    }

    getAllNPCs() { return this.npcs; }
    getRandomDialogue(npc) { return npc.dialogue[Math.floor(Math.random() * npc.dialogue.length)]; }
    interactWithNPC(npcIndex) {
        if (npcIndex < 0 || npcIndex >= this.npcs.length) return null;
        const npc = this.npcs[npcIndex];
        npc.interacted = true;
        return { name: npc.name, role: npc.role, dialogue: this.getRandomDialogue(npc), quests: npc.quests };
    }
}