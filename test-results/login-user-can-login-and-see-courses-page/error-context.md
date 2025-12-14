# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - heading "Course Manager" [level=1] [ref=e4]
      - navigation [ref=e5]:
        - link "Home" [ref=e6] [cursor=pointer]:
          - /url: /
        - link "Courses" [ref=e7] [cursor=pointer]:
          - /url: /courses
        - button "Logout" [ref=e8] [cursor=pointer]
  - main [ref=e9]:
    - generic [ref=e10]:
      - heading "Login" [level=1] [ref=e11]
      - textbox "Email" [ref=e12]: test@example.com
      - textbox "Password" [ref=e13]: Password@123
      - button "Login" [ref=e14] [cursor=pointer]
      - generic [ref=e15]:
        - paragraph [ref=e16]: Don’t have an account?
        - link "Register here" [ref=e17] [cursor=pointer]:
          - /url: /register
  - contentinfo [ref=e18]: Built by Srilakshmi — Course Manager Scaffold
  - button "Open Next.js Dev Tools" [ref=e24] [cursor=pointer]:
    - img [ref=e25]
  - alert [ref=e28]
```