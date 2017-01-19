
function RM_schedulable(tasks) {
    return monotonic_schedulable(tasks.slice().sort((a, b) => a.T > b.T), (r, task) => r <= t.T);
}

function DM_schedulable(tasks) {
    return monotonic_schedulable(tasks.slice().sort((a, b) => a.D > b.D), (r, task) => r <= t.D);
}

function EDF_schedulable(tasks) {
    if (!necessary_condition(tasks)) {
        return false;
    }

    if (!tasks.some(t => t.T > t.C)) {
        return true;
    }

     const compute_L = tasks => {
        let prev = 0;
        let curr = tasks.reduce((acc, curr) => acc + curr.C, 0);

        const W = t => tasks.reduce((acc, curr) => acc + Math.ceil(t / curr.T) * curr.C, 0);

        while (prev != curr) {
            prev = curr
            curr = W(curr);
        }

        return curr;
    }

    let L = compute_L(tasks);
    tasks.filter(t => t.D < L).forEach(d => {
        let sum = tasks.filter(t => t.D < d.D)
                       .reduce((acc, curr) => acc + (1 + Math.floor((d.D - curr.D) / curr.T)) * curr.C, 0);
        if (sum > d.D) return false;
    });

    return true;
}

const necessary_condition = tasks => tasks.reduce((acc, curr) => acc + curr.C / curr.T, 0) <= 1;

function monotonic_schedulable(sorted_tasks, compare_r_and_task) {
    if (!necessary_condition(tasks)) {
        return false;
    }

    const response_time = i => {
        let prev = 0;
        let curr = sorted_tasks[i].C;

        while (prev != curr) {
            prev = curr;
            curr = sorted_tasks[i].C + sorted_tasks.slice(i).reduce((acc, t) => acc + Math.ceil(curr / t.T) * t.C, 0);
        }
        return curr;
    }

    const Rs = sorted_tasks.map((el, idx) => response_time(idx));

    for (let i = 0; i < sorted_tasks.length; ++i) {
        if (!compare_r_and_task(Rs[i], sorted_tasks[i])) {
            return false;
        }
    }
    return true;
}

const pack

function Task(T, C, D) {
    return {
        T:  T,
        C:  C,
        D:  D
    }
}

// SAMPLE CODE
let A = Task(15,4,0);
let B = Task(10,3,0);
let C = Task(5,2,0);

let tasks = [A, B, C];
console.log("RM Schedulable " + RM_schedulable(tasks));
