import { subjectLabels } from '../constants/subject-japanese-map'
import type {
  AcademicSubject,
  LanguageSubject,
  TechSubject,
  BusinessSubject,
  LifeSkillSubject,
  HealthSubject,
  HobbySubject,
  MusicSubject,
  SportSubject,
  CertificationSubject,
} from '../types/data/general-subject-id-data'

// カテゴリ別のsubject取得関数
export const getSubjectsByCategory = () => ({
  academic: Object.keys(subjectLabels).filter((key) =>
    [
      'japanese',
      'english',
      'mathematics',
      'science',
      'physics',
      'chemistry',
      'biology',
      'earth_science',
      'social_studies',
      'history',
      'geography',
      'civics',
      'economics',
      'art',
      'music',
      'physical_education',
      'health',
      'home_economics',
      'technology',
      'information',
      'moral_education',
      'integrated_studies',
    ].includes(key)
  ) as AcademicSubject[],

  languages: Object.keys(subjectLabels).filter((key) =>
    [
      'chinese',
      'korean',
      'french',
      'german',
      'spanish',
      'italian',
      'portuguese',
      'russian',
      'arabic',
      'hindi',
      'thai',
      'vietnamese',
    ].includes(key)
  ) as LanguageSubject[],

  tech: Object.keys(subjectLabels).filter((key) =>
    [
      'programming',
      'javascript',
      'typescript',
      'python',
      'java',
      'cpp',
      'csharp',
      'go',
      'rust',
      'swift',
      'kotlin',
      'web_development',
      'mobile_development',
      'data_science',
      'machine_learning',
      'ai',
      'database',
      'system_design',
      'cybersecurity',
      'cloud_computing',
    ].includes(key)
  ) as TechSubject[],

  business: Object.keys(subjectLabels).filter((key) =>
    [
      'business',
      'marketing',
      'sales',
      'accounting',
      'finance',
      'management',
      'leadership',
      'project_management',
      'presentation',
      'negotiation',
      'entrepreneurship',
      'investment',
      'real_estate',
      'insurance',
      'consulting',
    ].includes(key)
  ) as BusinessSubject[],

  lifeSkills: Object.keys(subjectLabels).filter((key) =>
    [
      'cooking',
      'cleaning',
      'gardening',
      'diy',
      'budgeting',
      'time_management',
      'organization',
      'communication',
      'public_speaking',
      'writing',
      'reading',
      'critical_thinking',
      'problem_solving',
    ].includes(key)
  ) as LifeSkillSubject[],

  health: Object.keys(subjectLabels).filter((key) =>
    [
      'exercise',
      'yoga',
      'meditation',
      'nutrition',
      'mental_health',
      'sleep',
      'stress_management',
      'weight_training',
      'cardio',
      'stretching',
      'walking',
      'running',
      'swimming',
      'cycling',
    ].includes(key)
  ) as HealthSubject[],

  hobbies: Object.keys(subjectLabels).filter((key) =>
    [
      'drawing',
      'painting',
      'photography',
      'video_editing',
      'graphic_design',
      'writing_creative',
      'blogging',
      'journaling',
      'crafting',
      'knitting',
      'woodworking',
      'pottery',
      'calligraphy',
      'origami',
    ].includes(key)
  ) as HobbySubject[],

  music: Object.keys(subjectLabels).filter((key) =>
    [
      'piano',
      'guitar',
      'violin',
      'drums',
      'bass',
      'saxophone',
      'flute',
      'trumpet',
      'singing',
      'music_theory',
      'composition',
      'music_production',
    ].includes(key)
  ) as MusicSubject[],

  sports: Object.keys(subjectLabels).filter((key) =>
    [
      'soccer',
      'basketball',
      'baseball',
      'tennis',
      'volleyball',
      'badminton',
      'table_tennis',
      'golf',
      'martial_arts',
      'boxing',
      'swimming_sport',
      'track_field',
      'skiing',
      'snowboarding',
    ].includes(key)
  ) as SportSubject[],

  certifications: Object.keys(subjectLabels).filter((key) =>
    [
      'toeic',
      'toefl',
      'eiken',
      'jlpt',
      'ielts',
      'cpa',
      'fp',
      'it_passport',
      'basic_information_technology',
      'applied_information_technology',
      'aws',
      'google_cloud',
      'azure',
      'pmp',
      'scrum_master',
    ].includes(key)
  ) as CertificationSubject[],
})
