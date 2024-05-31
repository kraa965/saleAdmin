export const TeamMemberProgress = (level, bp, skillsNum) => {

    if (level === 1) {
        const bpXp = bp * 106 > 7000 ? 7000 : bp * 106;
        const skillXp = skillsNum * 1000;
        const percent = (bpXp + skillXp) / 10000 * 100;
        const progressTotal = (bpXp + skillXp) / 120000 * 100;
        return { percent, progressTotal }
    }

    if (level === 2) {
        const bpXp = (bp - 66) * 106 > 7000 ? 7000 : (bp - 66) * 106;
        const skillXp = (skillsNum - 3) * 1000;
        const percent = (bpXp + skillXp) / 10000 * 100;
        const progressTotal = (bpXp + skillXp + 10000) / 120000 * 100;
        return { percent, progressTotal }
    }

    if (level === 3) {
        const bpXp = (bp - 132) * 80 > 7000 ? 7000 : (bp - 132) * 80;
        const skillXp = (skillsNum - 6) * 1000;
        const percent = (bpXp + skillXp) / 10000 * 100;
        const progressTotal = (bpXp + skillXp + 20000) / 120000 * 100;
        return { percent, progressTotal }
    }

    if (level === 4) {
        const bpXp = (bp - 220) * 91 > 8000 ? 8000 : (bp - 220) * 91;
        const skillXp = (skillsNum - 9) * 1000;
        const percent = (bpXp + skillXp) / 10000 * 100;
        const progressTotal = (bpXp + skillXp + 30000) / 120000 * 100;
        return { percent, progressTotal }
    }

    if (level === 5) {
        const bpXp = (bp - 308) * 73 > 8000 ? 8000 : (bp - 308) * 73;
        const skillXp = (skillsNum - 11) * 1000;
        const percent = (bpXp + skillXp) / 10000 * 100;
        const progressTotal = (bpXp + skillXp + 40000) / 120000 * 100;
        return { percent, progressTotal }
    }

    if (level === 6) {
        const bpXp = (bp - 418) * 82 > 9000 ? 9000 : (bp - 418) * 82;
        const skillXp = (skillsNum - 13) * 1000;
        const percent = (bpXp + skillXp) / 10000 * 100;
        const progressTotal = (bpXp + skillXp + 50000) / 120000 * 100;
        return { percent, progressTotal }
    }

    if (level === 7) {
        const bpXp = (bp - 528) * 91 > 10000 ? 10000 : (bp - 528) * 91;
        const skillXp = 0;
        const percent = (bpXp + skillXp) / 10000 * 100;
        const progressTotal = (bpXp + skillXp + 60000) / 120000 * 100;
        return { percent, progressTotal }
    }

    if (level === 8) {
        const bpXp = (bp - 638) * 76 > 10000 ? 10000 : (bp - 638) * 76;
        const skillXp = 0;
        const percent = (bpXp + skillXp) / 10000 * 100;
        const progressTotal = (bpXp + skillXp + 70000) / 120000 * 100;
        return { percent, progressTotal }
    }

    if (level === 9) {
        const bpXp = (bp - 770) * 76 > 10000 ? 10000 : (bp - 770) * 76;
        const skillXp = 0;
        const percent = (bpXp + skillXp) / 10000 * 100;
        const progressTotal = (bpXp + skillXp + 80000) / 120000 * 100;
        return { percent, progressTotal }
    }

    if (level === 10) {
        const bpXp = (bp - 902) * 76 > 10000 ? 10000 : (bp - 902) * 76;
        const skillXp = 0;
        const percent = (bpXp + skillXp) / 10000 * 100;
        const progressTotal = (bpXp + skillXp + 90000) / 120000 * 100;
        return { percent, progressTotal }
    }

    if (level === 11) {
        const bpXp = (bp - 1034) * 76 > 10000 ? 10000 : (bp - 1034) * 76;
        const skillXp = 0;
        const percent = (bpXp + skillXp) / 10000 * 100;
        const progressTotal = (bpXp + skillXp + 100000) / 120000 * 100;
        return { percent, progressTotal }
    }

    if (level === 12) {
        const bpXp = (bp - 1166) * 76 > 10000 ? 10000 : (bp - 1166) * 76;
        const skillXp = 0;
        const percent = (bpXp + skillXp) / 10000 * 100;
        const progressTotal = (bpXp + skillXp + 110000) / 120000 * 100;
        return { percent, progressTotal }
    }
}

export const handleReliability = (reliability) => {
    if (reliability >= 100) {
        return 'Крайне высокая';
    }

    if (reliability < 100 && reliability >= 99) {
        return 'Очень высокая';
    }

    if (reliability < 99 && reliability >= 98) {
        return 'Высокая';
    }

    if (reliability < 98 && reliability >= 97) {
        return 'Выше среднего';
    }

    if (reliability < 97 && reliability >= 96) {
        return 'Средняя';
    }
    if (reliability < 96 && reliability >= 95) {
        return 'Низкая';
    }
    if (reliability < 95 && reliability >= 93) {
        return 'Очень низкая';
    }
    if (reliability < 93) {
        return 'Крайне низкая';
    }
}


export const handleActive = (activity) => {
    if (activity >= 90) {
        return 'Крайне высокая';
    }

    if (activity < 90 && activity >= 80) {
        return 'Очень высокая';
    }

    if (activity < 80 && activity >= 70) {
        return 'Высокая';
    }

    if (activity < 70 && activity >= 60) {
        return 'Выше среднего';
    }

    if (activity < 60 && activity >= 50) {
        return 'Средняя';
    }
    if (activity < 50 && activity >= 40) {
        return 'Низкая';
    }
    if (activity < 40 && activity >= 30) {
        return 'Очень низкая';
    }
    if (activity < 30) {
        return 'Крайне низкая';
    }
}
