package com.chunjae.chunjaefull5final.service;

import com.chunjae.chunjaefull5final.domain.*;
import com.chunjae.chunjaefull5final.dto.EvaluationDTO;
import com.chunjae.chunjaefull5final.dto.IdNameListDTO;
import com.chunjae.chunjaefull5final.repository.PaperInfo.PaperInfoRepository;
import com.chunjae.chunjaefull5final.repository.PaperQuestion.PaperQuestionRepository;
import com.chunjae.chunjaefull5final.repository.Subject.SubjectRepository;
import com.chunjae.chunjaefull5final.repository.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class Step1ServiceImpl implements Step1Service {

    private final RestTemplate restTemplate;

    private final PaperInfoRepository paperInfoRepo;
    private final SubjectRepository subjectRepo;
    private final UserRepository userRepo;

    private final PaperQuestionRepository paperQuestionRepo;

    @Override
    public String saveExam(String examBody, int subject) throws ParseException {
        JSONParser parser = new JSONParser();
        Object obj = parser.parse(examBody);
        JSONObject examJson = (JSONObject) obj;

        String yn = (String) examJson.get("successYn");
        if ("Y".equals(yn)) {

            JSONArray itemList = (JSONArray) examJson.get("itemList");

            PaperInfo temp = tempPaperInfo(subject, itemList.size(), 2L, "save_name");
            PaperInfo saved = paperInfoRepo.save(temp);
            if (saved == null) return "N";

            saveQuestions(itemList, saved.getPaperId());


            return "Y";
        } else {
            return "N";
        }
    }

    @Override
    public PaperInfo tempPaperInfo(int subject, int itemCount, long user, String saveName) {
        System.out.println(subject);
        Subject subjectEntity = subjectRepo.findById(subject).orElseThrow(RuntimeException::new);
        User userEntity = userRepo.findById(user).orElseThrow(RuntimeException::new);

        PaperInfo temp = PaperInfo.builder()
                .paperGubun(PaperGubun.New)
                .title(user + "temp" + subject)
                .subject(subjectEntity)
                .itemCount(itemCount)
                .user(userEntity)
                .saveName(saveName)
                .build();

        PaperInfo result;
        try {
            result = paperInfoRepo.save(temp);
        } catch (Exception e) {
            System.out.println(e + "paper 자체를 저장 못하는듯?");
            result = null;
        }
        return result;
    }

    public void saveQuestions(JSONArray itemList, Long paperId) {

        List<Long> itemIdList = new ArrayList<>();
        for (int i = 0; i < itemList.size(); i++) {
            JSONObject oneItem = (JSONObject) itemList.get(i);
            Long itemId = (Long) oneItem.get("itemId");
            itemIdList.add(itemId);
        }

        String url = "https://tsherpa.item-factory.com/item-img/item-list";
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("itemIdList", itemIdList);
        ResponseEntity<String> itemResponse = postRequest(url, requestBody);

        String itemResponseBody = itemResponse.getBody();
        try {
            JSONParser parser = new JSONParser();
            Object parsedBody = parser.parse(itemResponseBody);
            JSONObject itemListJson = (JSONObject) parsedBody;

            JSONArray itemInfoList = (JSONArray) itemListJson.get("itemList");
            paperQuestionRepo.saveQuestions(itemInfoList,paperId);


        } catch (Exception e) {
            System.out.println(e);
        }


    }

    public List<EvaluationDTO> getEvalList(String evalBody) {
        List<EvaluationDTO> evaluationList = new ArrayList<>();

        try {

            JSONParser parser = new JSONParser();
            Object obj = parser.parse(evalBody);
            JSONObject jsonObj = (JSONObject) obj;

            JSONArray evalJsonList = (JSONArray) jsonObj.get("evaluationList");
            for (int i = 0; i < evalJsonList.size(); i++) {
                JSONObject evalJson = (JSONObject) evalJsonList.get(i);
                Long domainId = (Long) evalJson.get("domainId");
                String domainName = (String) evalJson.get("domainName");

                EvaluationDTO dto = new EvaluationDTO();
                dto.setDomainId(domainId);
                dto.setDomainName(domainName);

                evaluationList.add(dto);
            }

        } catch (Exception e) {
            System.out.println(e);
            System.out.println("이발 실패");
        }

        return evaluationList;
    }

    public IdNameListDTO chapterGrouping(String chapterBody) {

        IdNameListDTO subjectList = null;

        try {

            JSONParser parser = new JSONParser();
            Object obj = parser.parse(chapterBody);
            JSONObject jsonObj = (JSONObject) obj;

            JSONArray chapterList = (JSONArray) jsonObj.get("chapterList");

            JSONObject subjectInfo = (JSONObject) chapterList.get(0);

            String curriculumCode = (String) subjectInfo.get("curriculumCode");
            String curriculumName = (String) subjectInfo.get("curriculumName");

            Long subjectId = (Long) subjectInfo.get("subjectId");
            String subjectName = (String) subjectInfo.get("subjectName");

            subjectList = new IdNameListDTO(subjectId, subjectName + "#" + curriculumName, new ArrayList<>());


            Map<Long, Long> smallTopicMap = new HashMap<>();

            for (int i = 0; i < chapterList.size(); i++) {

                JSONObject item = (JSONObject) chapterList.get(i);

                Long largeChapterId = (Long) item.get("largeChapterId");
                String largeChapterName = (String) item.get("largeChapterName");
                Long mediumChapterId = (Long) item.get("mediumChapterId");
                String mediumChapterName = (String) item.get("mediumChapterName");
                Long smallChapterId = (Long) item.get("smallChapterId");
                String smallChapterName = (String) item.get("smallChapterName");
                Long topicChapterId = (Long) item.get("topicChapterId");
                String topicChapterName = (String) item.get("topicChapterName");


                List<IdNameListDTO> largeList = subjectList.getList();

                if (largeList.size() == 0 || !largeList.get(largeList.size() - 1).getId().equals(largeChapterId)) {
                    IdNameListDTO largeInl = new IdNameListDTO(largeChapterId, largeChapterName, new ArrayList());
                    largeList.add(largeInl);
                }

                IdNameListDTO largeChapter = largeList.get(largeList.size() - 1);


                List<IdNameListDTO> mediumList = largeChapter.getList();

                if (mediumList.size() == 0 || !mediumList.get(mediumList.size() - 1).getId().equals(mediumChapterId)) {
                    IdNameListDTO mediumInl = new IdNameListDTO(mediumChapterId, mediumChapterName, new ArrayList<>());
                    mediumList.add(mediumInl);
                }

                IdNameListDTO mediumChapter = mediumList.get(mediumList.size() - 1);


                List<IdNameListDTO> smallList = mediumChapter.getList();

                if (smallList.size() == 0 || !smallList.get(smallList.size() - 1).getId().equals(smallChapterId)) {
                    smallTopicMap = getSmallItemNo(curriculumCode, subjectId, largeChapterId, mediumChapterId, smallChapterId);
                    int smallItemNo = 0;
                    if (smallTopicMap.containsKey(smallChapterId)) {
                        smallItemNo = smallTopicMap.get(smallChapterId).intValue();
                    }
                    IdNameListDTO smallInl = new IdNameListDTO(smallChapterId, smallChapterName, new ArrayList<>(), smallItemNo);
                    smallList.add(smallInl);
                }

                IdNameListDTO smallChapter = smallList.get(smallList.size() - 1);

                int topicItemNo = 0;
                if (smallTopicMap.containsKey(topicChapterId)) {
                    topicItemNo = smallTopicMap.get(topicChapterId).intValue();
                }
                List<IdNameListDTO> topicList = smallChapter.getList();
                topicList.add(new IdNameListDTO(topicChapterId, topicChapterName, null, topicItemNo));

            }

        } catch (Exception e) {
            System.out.println(e);
            System.out.println("그루핑 실패");
        }
        return subjectList;
    }

    private Map<Long, Long> getSmallItemNo(String curriculumCode, Long subjectId, Long largeChapterId, Long mediumChapterId, Long smallChapterId) {

        String url = "https://tsherpa.item-factory.com/item-img/chapters/item-count";
        Map<String, Object> requestBody = new HashMap<>();
        /* 파라미터에 있는거 requestBody 에 put 해줘, 이름은 똑같이 */
        requestBody.put("curriculumCode", curriculumCode);
        requestBody.put("subjectId", subjectId);
        requestBody.put("largeChapterId", largeChapterId);
        requestBody.put("mediumChapterId", mediumChapterId);
        requestBody.put("smallChapterId", smallChapterId);

        ResponseEntity<String> response = postRequest(url, requestBody);

        String responseBody = response.getBody();

        Long smallCount = 0L;
        Map<Long, Long> topicCountMap = new HashMap<>();
        try {
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(responseBody);
            JSONObject jsonObj = (JSONObject) obj;

            JSONArray smallCountList = (JSONArray) jsonObj.get("listSmallItemCount");

            smallCount = (Long) ((JSONObject) smallCountList.get(0)).get("itemCount");

            topicCountMap.put(smallChapterId, smallCount);


            JSONArray topicCountList = (JSONArray) jsonObj.get("listTopicItemCount");

            for (int i = 0; i < topicCountList.size(); i++) {
                JSONObject topicObject = (JSONObject) topicCountList.get(i);


                Long topicChapterId = (Long) topicObject.get("topicChapterId");
                Long topicItemCount = (Long) topicObject.get("itemCount");


                topicCountMap.put(topicChapterId, topicItemCount);
            }


        } catch (ParseException e) {
            System.out.println(e);
            System.out.println("문항개수 파싱 실패");
        } catch (IndexOutOfBoundsException e) {
            System.out.println("왜인지 모르겠지만 아무것도 안뱉는 친구가 있음...");
            smallCount = 0l;
        }

        return topicCountMap;
    }

    /**
     * 리퀘스트바디 가져와서 post로 보내고 Response 받아오는 행위
     */
    public ResponseEntity<String> postRequest(String url, Map<String, Object> requestBody) {

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = null;
        try {
            response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        } catch (Exception e) {
            System.out.println(e);
        }
        return response;
    }


}
