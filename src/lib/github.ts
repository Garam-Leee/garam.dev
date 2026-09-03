const GITHUB_USERNAME = "garamdev"; // TODO: 실제 GitHub 유저명으로 변경
const GITHUB_API = "https://api.github.com";

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

export interface GitHubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubStats {
  totalCommits: number;
  totalStars: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  contributionData: GitHubContribution[];
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  CSS: "#563d7c",
  HTML: "#e34c26",
  GLSL: "#5686a5",
  Other: "#8b949e",
};

// 실제 GitHub Contributions API는 GraphQL을 통해야 함
// 여기서는 REST API로 가져올 수 있는 데이터를 사용
export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`,
      {
        headers,
        next: { revalidate: 3600 }, // 1시간 캐시
      }
    );

    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

    const repos: GitHubRepo[] = await res.json();
    return repos.filter((r) => !r.fork);
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const repos = await fetchGitHubRepos();

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

  // 언어 분포 계산
  const langCount: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language) {
      langCount[r.language] = (langCount[r.language] || 0) + 1;
    }
  });

  const totalLangs = Object.values(langCount).reduce((a, b) => a + b, 0);
  const topLanguages = Object.entries(langCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / totalLangs) * 100),
      color: LANGUAGE_COLORS[name] || LANGUAGE_COLORS.Other,
    }));

  // 파티클 시각화용 Mock Contribution 데이터 (GitHub GraphQL 없이)
  // 실제 배포 시 GitHub GraphQL API로 교체 권장
  const contributionData = generateMockContributions();

  return {
    totalCommits: contributionData.reduce((sum, d) => sum + d.count, 0),
    totalStars,
    topLanguages,
    contributionData,
  };
}

function generateMockContributions(): GitHubContribution[] {
  const data: GitHubContribution[] = [];
  const now = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // 실제 개발 패턴을 반영한 랜덤 데이터
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseProb = isWeekend ? 0.3 : 0.7;
    const hasContribution = Math.random() < baseProb;

    const count = hasContribution
      ? Math.floor(Math.random() * 15) + 1
      : 0;

    const level = count === 0 ? 0 : count < 3 ? 1 : count < 7 ? 2 : count < 12 ? 3 : 4;

    data.push({
      date: date.toISOString().split("T")[0],
      count,
      level: level as 0 | 1 | 2 | 3 | 4,
    });
  }

  return data;
}

export { GITHUB_USERNAME };
