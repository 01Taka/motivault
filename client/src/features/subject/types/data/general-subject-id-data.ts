// 学校教科（Academic Subjects）
export type AcademicSubject =
  | 'japanese'
  | 'english'
  | 'mathematics'
  | 'science'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'earth_science'
  | 'social_studies'
  | 'history'
  | 'geography'
  | 'civics'
  | 'economics'
  | 'art'
  | 'music'
  | 'physical_education'
  | 'health'
  | 'home_economics'
  | 'technology'
  | 'information'
  | 'moral_education'
  | 'integrated_studies'

// 語学（Languages）
export type LanguageSubject =
  | 'chinese'
  | 'korean'
  | 'french'
  | 'german'
  | 'spanish'
  | 'italian'
  | 'portuguese'
  | 'russian'
  | 'arabic'
  | 'hindi'
  | 'thai'
  | 'vietnamese'

// プログラミング・IT（Programming & IT）
export type TechSubject =
  | 'programming'
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'cpp'
  | 'csharp'
  | 'go'
  | 'rust'
  | 'swift'
  | 'kotlin'
  | 'web_development'
  | 'mobile_development'
  | 'data_science'
  | 'machine_learning'
  | 'ai'
  | 'database'
  | 'system_design'
  | 'cybersecurity'
  | 'cloud_computing'

// ビジネス・仕事（Business & Work）
export type BusinessSubject =
  | 'business'
  | 'marketing'
  | 'sales'
  | 'accounting'
  | 'finance'
  | 'management'
  | 'leadership'
  | 'project_management'
  | 'presentation'
  | 'negotiation'
  | 'entrepreneurship'
  | 'investment'
  | 'real_estate'
  | 'insurance'
  | 'consulting'

// 生活スキル（Life Skills）
export type LifeSkillSubject =
  | 'cooking'
  | 'cleaning'
  | 'gardening'
  | 'diy'
  | 'budgeting'
  | 'time_management'
  | 'organization'
  | 'communication'
  | 'public_speaking'
  | 'writing'
  | 'reading'
  | 'critical_thinking'
  | 'problem_solving'

// 健康・フィットネス（Health & Fitness）
export type HealthSubject =
  | 'exercise'
  | 'yoga'
  | 'meditation'
  | 'nutrition'
  | 'mental_health'
  | 'sleep'
  | 'stress_management'
  | 'weight_training'
  | 'cardio'
  | 'stretching'
  | 'walking'
  | 'running'
  | 'swimming'
  | 'cycling'

// 趣味・創作（Hobbies & Creative）
export type HobbySubject =
  | 'drawing'
  | 'painting'
  | 'photography'
  | 'video_editing'
  | 'graphic_design'
  | 'writing_creative'
  | 'blogging'
  | 'journaling'
  | 'crafting'
  | 'knitting'
  | 'woodworking'
  | 'pottery'
  | 'calligraphy'
  | 'origami'

// 音楽・楽器（Music & Instruments）
export type MusicSubject =
  | 'piano'
  | 'guitar'
  | 'violin'
  | 'drums'
  | 'bass'
  | 'saxophone'
  | 'flute'
  | 'trumpet'
  | 'singing'
  | 'music_theory'
  | 'composition'
  | 'music_production'

// スポーツ（Sports）
export type SportSubject =
  | 'soccer'
  | 'basketball'
  | 'baseball'
  | 'tennis'
  | 'volleyball'
  | 'badminton'
  | 'table_tennis'
  | 'golf'
  | 'martial_arts'
  | 'boxing'
  | 'swimming_sport'
  | 'track_field'
  | 'skiing'
  | 'snowboarding'

// 資格・試験（Certifications & Exams）
export type CertificationSubject =
  | 'toeic'
  | 'toefl'
  | 'eiken'
  | 'jlpt'
  | 'ielts'
  | 'cpa'
  | 'fp'
  | 'it_passport'
  | 'basic_information_technology'
  | 'applied_information_technology'
  | 'aws'
  | 'google_cloud'
  | 'azure'
  | 'pmp'
  | 'scrum_master'

// 全てのsubjectを統合した型
export type Subject =
  | AcademicSubject
  | LanguageSubject
  | TechSubject
  | BusinessSubject
  | LifeSkillSubject
  | HealthSubject
  | HobbySubject
  | MusicSubject
  | SportSubject
  | CertificationSubject
