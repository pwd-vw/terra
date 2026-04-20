# Smart Longan Farm — AI Agent System
## Multi-Session Orchestration Files

### File Structure
```
longan-agents/
├── AGENTS.md          ← อ่านก่อนทุก session (orchestration protocol)
├── CONTEXT.md         ← Technical context (schema, API, topology)
├── GUARDRAILS.md      ← Rules & constraints (ห้ามละเมิด)
├── ROLES.md           ← Role prompts สำหรับแต่ละ agent type
├── README.md          ← ไฟล์นี้
├── prompts/
│   └── PROMPTS.md     ← Session starter templates ทุก sprint
├── sprints/
│   └── CURRENT_SPRINT.md  ← Sprint status + task tracker
└── logs/
    ├── DECISION_LOG.md    ← Architecture decisions
    └── ISSUE_LOG.md       ← Bugs & problems
```

### Quick Start — New AI Session
1. โหลด AGENTS.md → CONTEXT.md → GUARDRAILS.md → CURRENT_SPRINT.md
2. เลือก role prompt จาก ROLES.md
3. Copy session template จาก PROMPTS.md
4. แทน [placeholder] ด้วยข้อมูลจริง
5. วาง prompt ที่ top ของ AI session
6. เมื่อจบ session → กรอก SESSION HANDOFF template

### Session ID Format
YYYY-MM-DD-[ROLE]-[NN]
Example: 2024-03-15-IMPL-03
