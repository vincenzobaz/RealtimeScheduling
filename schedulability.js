
function RM_schedulable(tasks) {
    return monotonic_schedulable(tasks.slice().sort((a, b) => a.T > b.T));
}

function DM_schedulable(tasks) {
    return monotonic_schedulable(tasks.slice().sort((a, b) => a.D > b.D));
}

function EDF_schedulable(tasks) {
    if (!necessary_condition(tasks)) {
        return false;
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
        let sum = tasks.filter(t => t.D < d.D).reduce((acc, curr) => acc + (1 + Math.floor((d.D - curr.D) / curr.T)) * curr.C, 0);
        if (sum > d.D) return false;
    });

    return true;
}

const necessary_condition = tasks => tasks.reduce((acc, curr) => acc + curr.C / curr.T, 0) <= 1;

function monotonic_schedulable(sorted_tasks) {
    if (!necessary_condition(tasks)) {
        return false;
    }

    const response_time = i => {
        let prev = 0;
        let curr = sorted_tasks[i].C;

        while (prev != curr) {
            prev = curr;

            let sum = 0;
            for (let j = 0; j < i; ++j) {
                sum += Math.ceil(curr / sorted_tasks[j].T) * sorted_tasks[j].C;
            }
            curr = sorted_tasks[i].C + sum;
        }
        return curr;
    }

    for (let i = 0; i < sorted_tasks.length; ++i) {
        let resp = response_time(i);
        if (resp > sorted_tasks[i].T) {
            return false;
        }
    }

    return true;
}


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
console.log("ordon " + RM_schedulable(tasks));
