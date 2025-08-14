// Mock API service to replace actual API calls in frontend-isolated branch
// This file provides mock data and functions that simulate API responses

// Mock data
const mockBases = [
  { id: 1, name: 'Fort Bragg', branch: 'Army', state: 'NC' },
  { id: 2, name: 'Norfolk Naval Station', branch: 'Navy', state: 'VA' },
  { id: 3, name: 'Wright-Patterson AFB', branch: 'Air Force', state: 'OH' },
  { id: 4, name: 'Camp Pendleton', branch: 'Marines', state: 'CA' },
];

const mockSubmissions = [
  {
    id: 1,
    title: 'Best Pediatrician in Fayetteville',
    content: 'Dr. Smith at Fort Bragg Pediatrics is amazing with kids. Highly recommend!',
    author: 'MilSpouse123',
    baseId: 1,
    tags: ['healthcare', 'pediatrician', 'fayetteville'],
    voteCount: 24,
    commentCount: 5,
    createdAt: new Date('2024-05-15'),
  },
  {
    id: 2,
    title: 'Great Pizza Place Near Base',
    content: 'Giuseppe\'s Pizza on Fort Bragg has the best NY style pizza in the area.',
    author: 'PizzaLover',
    baseId: 1,
    tags: ['food', 'pizza', 'italian'],
    voteCount: 18,
    commentCount: 3,
    createdAt: new Date('2024-06-22'),
  },
];

const mockComments = [
  {
    id: 1,
    content: 'Thank you for this recommendation!',
    author: 'GratefulParent',
    submissionId: 1,
    createdAt: new Date('2024-05-16'),
  },
  {
    id: 2,
    content: 'We\'ve been going there for 2 years and love it too!',
    author: 'LongtimeCustomer',
    submissionId: 1,
    createdAt: new Date('2024-05-18'),
  },
];

// Mock API functions
export const mockApi = {
  // Bases
  getBases: async () => {
    return Promise.resolve({ success: true, data: mockBases, error: null });
  },
  
  createBase: async (baseData: any) => {
    const newBase = { id: mockBases.length + 1, ...baseData };
    mockBases.push(newBase);
    return Promise.resolve({ success: true, data: newBase, error: null });
  },
  
  // Submissions
  getSubmissions: async (baseId?: number) => {
    const filtered = baseId 
      ? mockSubmissions.filter(sub => sub.baseId === baseId)
      : mockSubmissions;
    return Promise.resolve({ success: true, data: filtered, error: null });
  },
  
  getSubmission: async (id: number) => {
    const submission = mockSubmissions.find(sub => sub.id === id);
    return Promise.resolve({ 
      success: !!submission, 
      data: submission || null,
      error: null
    });
  },
  
  createSubmission: async (submissionData: any) => {
    const newSubmission = { 
      id: mockSubmissions.length + 1, 
      ...submissionData,
      voteCount: 0,
      commentCount: 0,
      createdAt: new Date(),
    };
    mockSubmissions.push(newSubmission);
    return Promise.resolve({ success: true, data: newSubmission, error: null });
  },
  
  // Votes
  createVote: async (submissionId: number) => {
    const submission = mockSubmissions.find(sub => sub.id === submissionId);
    if (submission) {
      submission.voteCount += 1;
      return Promise.resolve({ success: true, data: { submissionId, voteCount: submission.voteCount }, error: null });
    }
    return Promise.resolve({ success: false, data: null, error: 'Submission not found' });
  },
  
  // Comments
  getComments: async (submissionId: number) => {
    const filtered = mockComments.filter(comment => comment.submissionId === submissionId);
    return Promise.resolve({ success: true, data: filtered, error: null });
  },
  
  createComment: async (commentData: any) => {
    const newComment = { 
      id: mockComments.length + 1, 
      ...commentData,
      createdAt: new Date(),
    };
    mockComments.push(newComment);
    
    // Update comment count in submission
    const submission = mockSubmissions.find(sub => sub.id === commentData.submissionId);
    if (submission) {
      submission.commentCount += 1;
    }
    
    return Promise.resolve({ success: true, data: newComment, error: null });
  },
  
  // Auth
  getSession: async () => {
    return Promise.resolve({ 
      success: true, 
      data: { 
        user: { id: 1, name: 'Test User', email: 'test@example.com' },
        expires: new Date(Date.now() + 3600000).toISOString()
      },
      error: null
    });
  },
  
  register: async (userData: any) => {
    return Promise.resolve({ 
      success: true, 
      data: { 
        user: { id: mockBases.length + 1, ...userData },
        message: 'User registered successfully'
      },
      error: null
    });
  },
  
  signOut: async () => {
    return Promise.resolve({ success: true, data: { message: 'Signed out successfully' }, error: null });
  }
};

// Mock delay function to simulate network requests
export const mockDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));
