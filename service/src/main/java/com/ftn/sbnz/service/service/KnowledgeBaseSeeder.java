package com.ftn.sbnz.service.service;

import com.ftn.sbnz.model.cv.ExpertiseLevel;
import com.ftn.sbnz.model.kb.ExperienceLevelMapping;
import com.ftn.sbnz.model.kb.TechnologyKnowledgeProfile;
import org.kie.api.runtime.KieSession;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
public class KnowledgeBaseSeeder {

    public void seedKnowledgeBase(KieSession session) {
        seedExperienceMappings(session);
        seedTechnologyProfiles(session);
    }

    private void seedExperienceMappings(KieSession session) {

        session.insert(new ExperienceLevelMapping(0, 0, ExpertiseLevel.BEGINNER));
        session.insert(new ExperienceLevelMapping(1, 1, ExpertiseLevel.JUNIOR));
        session.insert(new ExperienceLevelMapping(2, 3, ExpertiseLevel.MID));
        session.insert(new ExperienceLevelMapping(4, 6, ExpertiseLevel.SENIOR));
        session.insert(new ExperienceLevelMapping(7, 100, ExpertiseLevel.EXPERT));
    }

    private void seedTechnologyProfiles(KieSession session) {

        session.insert(profile("React", ExpertiseLevel.BEGINNER,
                "JSX", "components", "props"));
        session.insert(profile("React", ExpertiseLevel.JUNIOR,
                "JSX", "components", "props", "useState", "events"));
        session.insert(profile("React", ExpertiseLevel.MID,
                "JSX", "components", "props", "useState", "useEffect", "events", "lifecycle"));
        session.insert(profile("React", ExpertiseLevel.SENIOR,
                "JSX", "components", "props", "useState", "useEffect", "context",
                "custom hooks", "lifecycle", "performance optimization"));
        session.insert(profile("React", ExpertiseLevel.EXPERT,
                "JSX", "components", "props", "useState", "useEffect", "context",
                "custom hooks", "lifecycle", "performance optimization",
                "memoization", "reconciliation"));

        session.insert(profile("PostgreSQL", ExpertiseLevel.BEGINNER,
                "SELECT", "INSERT", "UPDATE", "DELETE"));
        session.insert(profile("PostgreSQL", ExpertiseLevel.JUNIOR,
                "SELECT", "INSERT", "UPDATE", "DELETE", "JOIN", "WHERE"));
        session.insert(profile("PostgreSQL", ExpertiseLevel.MID,
                "SELECT", "JOIN", "WHERE", "GROUP BY", "INDEX", "subqueries"));
        session.insert(profile("PostgreSQL", ExpertiseLevel.SENIOR,
                "SELECT", "JOIN", "INDEX", "EXPLAIN", "transactions", "ACID",
                "subqueries", "window functions"));
        session.insert(profile("PostgreSQL", ExpertiseLevel.EXPERT,
                "SELECT", "JOIN", "INDEX", "EXPLAIN", "transactions", "ACID",
                "subqueries", "window functions", "CTE", "query optimization",
                "vacuum", "replication"));

        session.insert(profile("Java", ExpertiseLevel.BEGINNER,
                "classes", "objects", "methods", "variables"));
        session.insert(profile("Java", ExpertiseLevel.JUNIOR,
                "classes", "objects", "methods", "inheritance", "interfaces", "collections"));
        session.insert(profile("Java", ExpertiseLevel.MID,
                "classes", "inheritance", "interfaces", "collections", "generics",
                "exceptions", "streams"));
        session.insert(profile("Java", ExpertiseLevel.SENIOR,
                "classes", "interfaces", "collections", "generics", "streams",
                "concurrency", "threads", "JVM", "garbage collection"));
        session.insert(profile("Java", ExpertiseLevel.EXPERT,
                "classes", "interfaces", "generics", "streams", "concurrency",
                "JVM", "garbage collection", "memory model", "bytecode",
                "reactive programming", "JIT compilation"));
    }

    private TechnologyKnowledgeProfile profile(String tech, ExpertiseLevel level, String... concepts) {
        Set<String> set = new HashSet<>(Arrays.asList(concepts));
        return new TechnologyKnowledgeProfile(tech, level, set);
    }
}
