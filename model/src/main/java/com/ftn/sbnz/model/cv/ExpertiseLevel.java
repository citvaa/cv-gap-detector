package com.ftn.sbnz.model.cv;

public enum ExpertiseLevel {
    BEGINNER(1),
    JUNIOR(2),
    MID(3),
    SENIOR(4),
    EXPERT(5);

    private final int rank;

    ExpertiseLevel(int rank) {
        this.rank = rank;
    }

    public int getRank() {
        return rank;
    }
}
