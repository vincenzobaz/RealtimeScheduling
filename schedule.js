function RM_schedule(tasks, tot_time=20) {
    const increasing_priority = tasks.slice().sort((a, b) => a.T > b.T);

    let execution = new Array(tot_time + 1).map(() => '-');

    const curr_task = (t, i) => {
        if (i %)
    }

    console.log(increasing_priority);
    return execution;
}

tasks = [{C: 3, T: 5}, {C: 4, T: 2}];

RM_schedule(tasks);