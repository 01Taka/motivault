import type { Firestore } from 'firebase/firestore'
import * as admin from 'firebase-admin';
admin.initializeApp();

type RepositoryType = 'indexedDB' | 'firestore' | 'functions'

interface BaseRepositoryConstructorArgs {
  indexedDB: [uid: string],
  firestore: [firestore: Firestore, uid: string],
  functions: 
} 
