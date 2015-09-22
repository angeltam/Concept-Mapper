var graph =
  {
    "nodes":[
      {"name":"Boy","group":1},
      {"name":"Dog","group":1},
      {"name":"Cat","group":1},
      {"name":"House","group":1}
    ],
    "links":[
      {"source":0, "target":1, "relationship": "loves"},
      {"source":0, "target":2, "relationship": "loves"},
      {"source":0, "target":3, "relationship": "lives in"},
      {"source":1, "target":3, "relationship": "lives in"},
      {"source":1, "target":2, "relationship": "hates"}
    ]
  };
