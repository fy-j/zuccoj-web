<template>
  <base-box-frame>
    <template v-slot:content>
      <codemirror v-model="code" :options="options" class="code-editor"></codemirror>
    </template>
  </base-box-frame>
</template>

<script>
import BaseBoxFrame from '@/components/frame/base-box-frame'
import { codemirror } from 'vue-codemirror-lite'
require('codemirror/mode/clike/clike')
export default {
  name: "code-editor",
  components: {
    codemirror,
    'base-box-frame': BaseBoxFrame
  },
  data() {
    return {
      code: '#include <bits/stdc++.h>\n' +
          'using namespace std;\n' +
          '\n' +
          'const int maxn = 100+10;\n' +
          '\n' +
          'vector<int> bigger[maxn], smaller[maxn];\n' +
          'bool vis[maxn];\n' +
          '\n' +
          'int count(int p, vector<int> ve[]) {\n' +
          '    memset(vis,false, sizeof(vis));\n' +
          '    int cnt=0;\n' +
          '    queue<int>q;\n' +
          '    q.push(p);\n' +
          '    vis[p]=true;\n' +
          '    while(!q.empty()) {\n' +
          '        int now = q.front(); q.pop();\n' +
          '        for(auto it:ve[now]) {\n' +
          '            if(vis[it]) continue;\n' +
          '            cnt++;\n' +
          '            q.push(it);\n' +
          '            vis[it]=true;\n' +
          '        }\n' +
          '    }\n' +
          '    return cnt;\n' +
          '}\n' +
          '\n' +
          'int main() {\n' +
          '    int n,m,p;cin>>n>>m>>p;\n' +
          '    for(int i=0;i<m;i++){\n' +
          '        int x,y;cin>>x>>y;\n' +
          '        bigger[y].push_back(x);\n' +
          '        smaller[x].push_back(y);\n' +
          '    }\n' +
          '\n' +
          '    int a=count(p, bigger);\n' +
          '    int b=n-count(p, smaller);\n' +
          '\n' +
          '    for(int i=a+1;i<=b;i++){\n' +
          '        cout<<i<<\' \';\n' +
          '    }\n' +
          '\n' +
          '}',
      options: {
        mode: 'text/x-c++src',
        lineNumbers: true
      }
    }
  }
}
</script>

<style scoped>

</style>
