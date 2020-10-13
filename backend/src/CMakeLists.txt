target_include_directories (Vocascan PRIVATE .) 
target_sources (Vocascan PRIVATE 
    main.cpp
    database.hpp
    database.cpp
    NewVocabHandler.cpp
    NewVocabHandler.hpp
    LanguagePackageHandler.hpp
    LanguagePackageHandler.cpp
    FrontendHandler.hpp
    FrontendHandler.cpp
)

