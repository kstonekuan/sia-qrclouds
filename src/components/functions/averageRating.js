function averageRating(userRating){
    if(!userRating){
        return "-";
    } else {
        totalTasks = 0;
        totalTasks += userRating.none;
        totalTasks += userRating.one;
        totalTasks += userRating.two;
        totalTasks += userRating.three;
        totalTasks += userRating.four;
        totalTasks += userRating.five;
        if(totalTasks < 1){
            return "-";
        } else {
            meanRating = (userRating.one + 2*userRating.two + 3*userRating.three + 4*userRating.four + 5*userRating.five)/totalTasks;
            return meanRating.toFixed(2);
        }
    }
}
function averageTaskRatings(taskRatings){
    totalTasks = 0;
    totalRating = 0;
    while(taskRatings[totalTasks] != null){
        totalRating += taskRatings[totalTasks];
        totalTasks++;
    }
    if(totalTasks > 0){
        meanRating = totalRating/totalTasks;
        return 100 * meanRating.toFixed(2);
    } else {
        return '-';
    }
}

export { averageRating, averageTaskRatings };